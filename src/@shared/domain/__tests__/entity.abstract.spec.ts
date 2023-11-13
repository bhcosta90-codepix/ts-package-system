import {EntityAbstract} from "../entity.abstract";

class StubEntity extends EntityAbstract<{ prop1: string; prop2: number }> {
    constructor(props: {prop1: string; prop2: number}) {
        super(props);
    }
}

describe("Entity Unit Tests", () => {
    it("should set props and id", () => {
        const arrange = {prop1: "prop1 value", prop2: 10};
        const entity = new StubEntity(arrange);
        expect(entity['props']).toStrictEqual(arrange);
        expect(entity['_id']).not.toBeNull();
        expect(entity.created_at).not.toBeNull();
        expect(entity.updated_at).not.toBeNull();
    });

    it("should convert an entity to a JavaScript Object", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id.toString(),
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            ...arrange,
        });
    });

    it("should pass created, updated an entity", () => {
        const arrange = {
            prop1: "prop1 value",
            prop2: 10,
            created_at: '2020-01-01 00:00:00',
            updated_at: '2020-02-01 00:00:00',
        };
        const entity = new StubEntity(arrange);
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id.toString(),
            created_at: '2020-01-01 00:00:00',
            updated_at: '2020-01-01 00:00:00',
            ...arrange,
        });
    })
});