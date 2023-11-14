"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor() {
        this._events = [];
    }
    add(event) {
        this._events.push(event);
    }
    remove(name) {
        this._events = this._events.filter(item => !item.name().includes(name));
    }
    events() {
        return this._events;
    }
}
exports.Event = Event;
//# sourceMappingURL=event.js.map