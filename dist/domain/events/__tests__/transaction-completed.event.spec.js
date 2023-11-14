"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_completed_event_1 = require("../transaction-completed.event");
const transaction_entity_1 = require("../../transaction.entity");
describe("TransactionCompletedEvent Unit Test", () => {
    let event;
    let entity;
    beforeEach(() => {
        entity = new transaction_entity_1.Transaction.Factory().make();
        event = new transaction_completed_event_1.TransactionCompletedEvent(entity);
    });
    test("Testing name event", () => {
        expect(event.name()).toBe("transaction.completed." + entity.id);
    });
    test("Testing payload event", () => {
        expect(event.payload()).toStrictEqual(entity.toJSON());
    });
});
//# sourceMappingURL=transaction-completed.event.spec.js.map