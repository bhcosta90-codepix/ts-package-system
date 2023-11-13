import {EntityAbstract} from "../../@shared/domain/entity.abstract";
import {Transaction} from "../transaction.entity";
import {PixKeyValueObject} from "../vo/pix-key.vo";

describe("Transaction.Entity Unit Test", () => {
    test("Creating a new transaction", () => {
        const entity = new Transaction.Entity({
            pixKey: new PixKeyValueObject.ValueObject({
                kind: 3,
                key: 'test@test.com',
            }),
            value: 50,
            bank: 'bf48f7e0-8248-11ee-b962-0242ac120002',
            description: 'testing',
            reference: 'bf48f7e0-8248-11ee-b962-0242ac120002'
        });

        expect(entity).toBeInstanceOf(EntityAbstract)
        expect(entity.toJSON()).toMatchObject({
            pixKey: new PixKeyValueObject.ValueObject({
                kind: 3,
                key: 'test@test.com',
            }),
            value: 50,
            bank: 'bf48f7e0-8248-11ee-b962-0242ac120002',
            description: 'testing',
            reference: 'bf48f7e0-8248-11ee-b962-0242ac120002'
        });
    });

    describe("Factory entity", () => {
        test("creating a simple factory entity", () => {
            const entity = new Transaction.Builder().make();
            expect(entity.toJSON()).toMatchObject({
                pixKey: {
                    kind: 3,
                    key: 'test@test.com',
                },
                value: 50,
                description: 'testing',
                bank: '5ebe14a0-8252-11ee-b962-0242ac120002',
                reference: '65860928-8252-11ee-b962-0242ac120002'
            });
        });

        test("creating a factory entity with data", () => {
            const entity = new Transaction.Builder()
                .withKind(2)
                .withKey('(19) 98870-4040')
                .withBank('dc94d88e-8255-11ee-b962-0242ac120002')
                .withReference('e0a722a6-8255-11ee-b962-0242ac120002')
                .withValue(100)
                .withDescription('testing 2')
                .make();

            expect(entity.toJSON()).toMatchObject({
                pixKey: {
                    kind: 2,
                    key: '19988704040',
                },
                value: 100,
                description: 'testing 2',
                bank: 'dc94d88e-8255-11ee-b962-0242ac120002',
                reference: 'e0a722a6-8255-11ee-b962-0242ac120002'
            });
        })
    })
});