import {EntityAbstract} from "../../@shared/domain/entity.abstract";
import {Transaction} from "../transaction.entity";
import {PixKeyValueObject} from "../vo/pix-key.vo";
import {TransactionException} from "../exceptions/transaction.exception";
import {TransactionProcessedEvent} from "../events/transaction-processed.event";
import {TransactionConfirmedEvent} from "../events/transaction-confirmed.event";
import {TransactionCompletedEvent} from "../events/transaction-completed.event";

describe("Transaction.Entity Unit Test", () => {
    test("Creating a new transaction", () => {
        const entity = new Transaction.Entity({
            pixKey: new PixKeyValueObject.ValueObject({
                kind: "email",
                key: 'test@test.com',
            }),
            value: 50,
            bank: 'bf48f7e0-8248-11ee-b962-0242ac120002',
            description: 'testing',
            reference: 'bf48f7e0-8248-11ee-b962-0242ac120002'
        });

        expect(entity).toBeInstanceOf(EntityAbstract)
        expect(entity.kind).toBe(3);
        expect(entity.key).toBe("test@test.com");
        expect(entity.toJSON()).toMatchObject({
            pixKey: new PixKeyValueObject.ValueObject({
                kind: "email",
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
            const entity = new Transaction.Factory().make();
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
            const entity = new Transaction.Factory()
                .withKind("phone")
                .withKey('(19) 98870-4040')
                .withBank('dc94d88e-8255-11ee-b962-0242ac120002')
                .withReference('e0a722a6-8255-11ee-b962-0242ac120002')
                .withValue(100)
                .withDescription('testing 2')
                .withStatus(Transaction.Status.PROCESSED)
                .make();

            expect(entity.toJSON()).toMatchObject({
                pixKey: {
                    kind: 2,
                    key: '19988704040',
                },
                value: 100,
                description: 'testing 2',
                bank: 'dc94d88e-8255-11ee-b962-0242ac120002',
                reference: 'e0a722a6-8255-11ee-b962-0242ac120002',
                status: 2
            });
        })
    });

    describe("Transaction updated status", () => {
        test("change status to processed", () => {
            const entity = new Transaction.Factory().make();
            expect(entity.status).toBe(Transaction.Status.OPEN);
            entity.changeProcessed();
            expect(entity.events.length).toBe(1);
            expect(entity.events[0]).toBeInstanceOf(TransactionProcessedEvent);
            expect(entity.status).toBe(Transaction.Status.PROCESSED);

            const entityError = new Transaction.Factory()
                .withStatus(Transaction.Status.PROCESSED)
                .make();

            expect(() => entityError.changeProcessed()).toThrow(new TransactionException("Only open transactions can change to this status"));
        })

        test("change status to confirmed", () => {
            const entity = new Transaction.Factory()
                .withStatus(Transaction.Status.PROCESSED)
                .make();
            expect(entity.status).toBe(Transaction.Status.PROCESSED);
            entity.changeConfirmed();
            expect(entity.events.length).toBe(1);
            expect(entity.events[0]).toBeInstanceOf(TransactionConfirmedEvent);
            expect(entity.status).toBe(Transaction.Status.CONFIRMED);

            const entityError = new Transaction.Factory().make();
            expect(() => entityError.changeConfirmed()).toThrow(new TransactionException("Only processed charges can change to this status"));
        })

        test("change status to completed", () => {
            const entity = new Transaction.Factory()
                .withStatus(Transaction.Status.CONFIRMED)
                .make();
            expect(entity.status).toBe(Transaction.Status.CONFIRMED);
            entity.changeCompleted();
            expect(entity.events.length).toBe(1);
            expect(entity.events[0]).toBeInstanceOf(TransactionCompletedEvent);
            expect(entity.status).toBe(Transaction.Status.COMPLETED);

            const entityError = new Transaction.Factory().make();
            expect(() => entityError.changeCompleted()).toThrow(new TransactionException("Only confirmed charges can be completed"));
        })
    })
});