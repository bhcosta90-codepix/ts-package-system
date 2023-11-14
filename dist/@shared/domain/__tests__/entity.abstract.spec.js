"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_abstract_1 = require("../entity.abstract");
class StubEvent {
    name() {
        return "stub-event";
    }
    payload() {
        return {};
    }
}
class StubEntity extends entity_abstract_1.EntityAbstract {
    constructor(props) {
        super(props);
        this.prop1 = props.prop1;
    }
    changeProp(value) {
        this.prop1 = value;
        this.event.add(new StubEvent);
    }
}
describe("Entity Unit Tests", () => {
    it("should set props and id", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity['props']).toStrictEqual(arrange);
        expect(entity['_id']).not.toBeNull();
        expect(entity.created_at).not.toBeNull();
        expect(entity.updated_at).not.toBeNull();
        expect(entity.events.length).toBe(0);
    });
    it("should convert an entity to a JavaScript Object", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual(Object.assign({ id: entity.id.toString(), created_at: entity.created_at, updated_at: entity.updated_at }, arrange));
    });
    it("should pass created, updated an entity", () => {
        const arrange = {
            prop1: "prop1 value",
            prop2: 10,
            created_at: '2020-01-01 00:00:00',
            updated_at: '2020-02-01 00:00:00',
        };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual(Object.assign({ id: entity.id.toString(), created_at: '2020-01-01 00:00:00', updated_at: '2020-01-01 00:00:00' }, arrange));
    });
    it("change prop1", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        entity.changeProp("testing 2");
        expect(entity.prop1).toBe("testing 2");
        expect(entity.events.length).toBe(1);
    });
});
//# sourceMappingURL=entity.abstract.spec.js.map