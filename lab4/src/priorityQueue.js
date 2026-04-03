export class PriorityQueue {
  constructor() {
    this.items = [];
    this._counter = 0;
  }
  enqueue(item, priority) {
    this.items.push({
      item,
      priority,
      id: this._counter++
    });
  }
}