import {Event} from "../event"
import {EventInterface} from "../event.interface";

class Event01 implements EventInterface {
    name(): string {
        return "event-01-80c10c42-825c-11ee-b962-0242ac120002";
    }

    payload(): any {
        return {};
    }
}

class Event02 implements EventInterface {
    name(): string {
        return "event-02-85dd5442-825c-11ee-b962-0242ac120002";
    }

    payload(): any {
        return {};
    }
}

describe("Event Unit Test", () => {
    let event: Event;

    beforeEach(() => event = new Event())

    test("add event", () => {
        event.add(new Event01());
        event.add(new Event01());
        event.add(new Event01());
        expect(event.events().length).toBe(3);
    })

    test("remove event", () => {
        event.add(new Event01());
        event.add(new Event02());
        event.add(new Event01());
        event.remove("event-02")
        expect(event.events().length).toBe(2);
    })
})