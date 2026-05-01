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
        console.warn(`[ReactiveEmitter] Немає підписників на "${event}"`);
      }
      return;
    }

    listeners.forEach(listener => {
      try {
        listener(data);
      } catch (err) {
        console.error(`Error in listener for "${event}":`, err.message);
      }
    });
  }
}