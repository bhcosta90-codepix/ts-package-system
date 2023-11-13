import {EventInterface} from "./event.interface";

export class Event {
    protected _events: EventInterface[] = [];

    public add(event: EventInterface) {
        this._events.push(event);
    }

    public remove(name: string) {
        this._events = this._events.filter(item => !item.name().includes(name))
    }

    public events(): EventInterface[] {
        return this._events;
    }
}