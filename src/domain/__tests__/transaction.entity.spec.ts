import {EntityAbstract} from "../../@shared/domain/entity.abstract";
import {Transaction} from "../transaction.entity";

describe("Transaction.Entity Unit Test", () => {
    test("Creating a new transaction", () => {
        const entity = new Transaction.Entity({
            kind: 3,
            key: 'test@test.com',
            value: 50,
            bank: 'bf48f7e0-8248-11ee-b962-0242ac120002',
            description: 'testing',
            reference: 'bf48f7e0-8248-11ee-b962-0242ac120002'
        });

        expect(entity).toBeInstanceOf(EntityAbstract)
        expect(entity.toJSON()).toMatchObject({
            kind: 3,
            key: 'test@test.com',
            value: 50,
            bank: 'bf48f7e0-8248-11ee-b962-0242ac120002',
            description: 'testing',
            reference: 'bf48f7e0-8248-11ee-b962-0242ac120002'
        });
    });
});