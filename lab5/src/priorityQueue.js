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
  _findIndex(type) {
    if (this.items.length === 0) return -1;

    return this.items.reduce((bestIdx, curr, currIdx, arr) => {
      const best = arr[bestIdx];
      switch (type) {
        case 'highest': 
          return curr.priority > best.priority ? currIdx : bestIdx;
        case 'lowest':  
          return curr.priority < best.priority ? currIdx : bestIdx;
        case 'oldest':  
          return curr.id < best.id ? currIdx : bestIdx;
        case 'newest':  
          return curr.id > best.id ? currIdx : bestIdx;
        default: 
          return bestIdx;
      }
    }, 0);
  }
  peek(type) {
    const idx = this._findIndex(type);
    return idx !== -1 ? this.items[idx].item : null;
  }
  dequeue(type) {
    const idx = this._findIndex(type);
    if (idx === -1) return null;
    
    const removedItem = this.items.splice(idx, 1)[0];
    return removedItem.item;
  }
}