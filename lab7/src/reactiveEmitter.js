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
}