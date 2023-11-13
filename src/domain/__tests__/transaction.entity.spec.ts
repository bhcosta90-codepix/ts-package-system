import {PixKeyEntity, PixKeyKind} from "../pix-key.entity";
import {EntityAbstract} from "../../@shared/domain/entity.abstract";
import {TransactionEntity} from "../transaction.entity";

describe("TransactionEntity Unit Test", () => {
    test("Creating a new transaction", () => {
        const entity = new TransactionEntity({
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