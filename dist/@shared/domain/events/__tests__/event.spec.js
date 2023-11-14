"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("../event");
class Event01 {
    name() {
        return "event-01-80c10c42-825c-11ee-b962-0242ac120002";
    }
    payload() {
        return {};
    }
}
class Event02 {
    name() {
        return "event-02-85dd5442-825c-11ee-b962-0242ac120002";
    }
    payload() {
        return {};
    }
}
describe("Event Unit Test", () => {
    let event;
    beforeEach(() => event = new event_1.Event());
    test("add event", () => {
        event.add(new Event01());
        event.add(new Event01());
        event.add(new Event01());
        expect(event.events().length).toBe(3);
    });
    test("remove event", () => {
        event.add(new Event01());
        event.add(new Event02());
        event.add(new Event01());
        event.remove("event-02");
        expect(event.events().length).toBe(2);
    });
});
//# sourceMappingURL=event.spec.js.map