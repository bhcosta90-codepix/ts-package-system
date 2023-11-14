import { EventInterface } from "./event.interface";
export declare class Event {
    protected _events: EventInterface[];
    add(event: EventInterface): void;
    remove(name: string): void;
    events(): EventInterface[];
}
//# sourceMappingURL=event.d.ts.map