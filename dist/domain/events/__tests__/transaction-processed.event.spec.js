"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_processed_event_1 = require("../transaction-processed.event");
const transaction_entity_1 = require("../../transaction.entity");
describe("TransactionProcessedEvent Unit Test", () => {
    let event;
    let entity;
    beforeEach(() => {
        entity = new transaction_entity_1.Transaction.Factory().make();
        event = new transaction_processed_event_1.TransactionProcessedEvent(entity);
    });
    test("Testing name event", () => {
        expect(event.name()).toBe("transaction.processed." + entity.id);
    });
    test("Testing payload event", () => {
        expect(event.payload()).toStrictEqual(entity.toJSON());
    });
});
//# sourceMappingURL=transaction-processed.event.spec.js.map