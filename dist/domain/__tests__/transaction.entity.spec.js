"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_abstract_1 = require("../../@shared/domain/entity.abstract");
const transaction_entity_1 = require("../transaction.entity");
const pix_key_vo_1 = require("../vo/pix-key.vo");
const transaction_exception_1 = require("../exceptions/transaction.exception");
const transaction_processed_event_1 = require("../events/transaction-processed.event");
const transaction_confirmed_event_1 = require("../events/transaction-confirmed.event");
const transaction_completed_event_1 = require("../events/transaction-completed.event");
describe("Transaction.Entity Unit Test", () => {
    test("Creating a new transaction", () => {
        const entity = new transaction_entity_1.Transaction.Entity({
            pixKey: new pix_key_vo_1.PixKeyValueObject.ValueObject({
                kind: 3,
                key: 'test@test.com',
            }),
            value: 50,
            bank: 'bf48f7e0-8248-11ee-b962-0242ac120002',
            description: 'testing',
            reference: 'bf48f7e0-8248-11ee-b962-0242ac120002'
        });
        expect(entity).toBeInstanceOf(entity_abstract_1.EntityAbstract);
        expect(entity.toJSON()).toMatchObject({
            pixKey: new pix_key_vo_1.PixKeyValueObject.ValueObject({
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
            const entity = new transaction_entity_1.Transaction.Factory().make();
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
            const entity = new transaction_entity_1.Transaction.Factory()
                .withKind(2)
                .withKey('(19) 98870-4040')
                .withBank('dc94d88e-8255-11ee-b962-0242ac120002')
                .withReference('e0a722a6-8255-11ee-b962-0242ac120002')
                .withValue(100)
                .withDescription('testing 2')
                .withStatus(transaction_entity_1.Transaction.Status.PROCESSED)
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
        });
    });
    describe("Transaction updated status", () => {
        test("change status to processed", () => {
            const entity = new transaction_entity_1.Transaction.Factory().make();
            expect(entity.status).toBe(transaction_entity_1.Transaction.Status.OPEN);
            entity.changeProcessed();
            expect(entity.events.length).toBe(1);
            expect(entity.events[0]).toBeInstanceOf(transaction_processed_event_1.TransactionProcessedEvent);
            expect(entity.status).toBe(transaction_entity_1.Transaction.Status.PROCESSED);
            const entityError = new transaction_entity_1.Transaction.Factory()
                .withStatus(transaction_entity_1.Transaction.Status.PROCESSED)
                .make();
            expect(() => entityError.changeProcessed()).toThrow(new transaction_exception_1.TransactionException("Only open transactions can change to this status"));
        });
        test("change status to confirmed", () => {
            const entity = new transaction_entity_1.Transaction.Factory()
                .withStatus(transaction_entity_1.Transaction.Status.PROCESSED)
                .make();
            expect(entity.status).toBe(transaction_entity_1.Transaction.Status.PROCESSED);
            entity.changeConfirmed();
            expect(entity.events.length).toBe(1);
            expect(entity.events[0]).toBeInstanceOf(transaction_confirmed_event_1.TransactionConfirmedEvent);
            expect(entity.status).toBe(transaction_entity_1.Transaction.Status.CONFIRMED);
            const entityError = new transaction_entity_1.Transaction.Factory().make();
            expect(() => entityError.changeConfirmed()).toThrow(new transaction_exception_1.TransactionException("Only processed charges can change to this status"));
        });
        test("change status to completed", () => {
            const entity = new transaction_entity_1.Transaction.Factory()
                .withStatus(transaction_entity_1.Transaction.Status.CONFIRMED)
                .make();
            expect(entity.status).toBe(transaction_entity_1.Transaction.Status.CONFIRMED);
            entity.changeCompleted();
            expect(entity.events.length).toBe(1);
            expect(entity.events[0]).toBeInstanceOf(transaction_completed_event_1.TransactionCompletedEvent);
            expect(entity.status).toBe(transaction_entity_1.Transaction.Status.COMPLETED);
            const entityError = new transaction_entity_1.Transaction.Factory().make();
            expect(() => entityError.changeCompleted()).toThrow(new transaction_exception_1.TransactionException("Only confirmed charges can be completed"));
        });
    });
});
//# sourceMappingURL=transaction.entity.spec.js.map