export class ReactiveEmitter {
  constructor() {
    this.events = {}; 
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    this.events[event].add(listener);
    return () => this.off(event, listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event].delete(listener);
  }

  emit(event, data) {
    const listeners = this.events[event];

    if (!listeners || listeners.size === 0) {
      if (event !== 'error') {
        console.warn(`[ReactiveEmitter] Попередження: Немає підписників на подію "${event}".`);
      }
      return;
    }

    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (err) {
        this.emitError(err, event);
      }
    });
  }

  emitError(err, context) {
    const errorData = { 
      message: err.message, 
      sourceEvent: context, 
      timestamp: new Date().toISOString() 
    };
    
    const errorListeners = this.events['error'];

    if (errorListeners && errorListeners.size > 0) {
      errorListeners.forEach(handler => {
        try {
          handler(errorData);
        } catch (fatalErr) {
          console.error('Критична помилка в самому обробнику error:', fatalErr);
        }
      });
    } else {
      console.error('[ReactiveEmitter] Необроблена помилка (немає "error" ліснера):', errorData);
    }
  }
}