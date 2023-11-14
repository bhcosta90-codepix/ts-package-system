"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_confirmed_event_1 = require("../transaction-confirmed.event");
const transaction_entity_1 = require("../../transaction.entity");
describe("TransactionConfirmedEvent Unit Test", () => {
    let event;
    let entity;
    beforeEach(() => {
        entity = new transaction_entity_1.Transaction.Factory().make();
        event = new transaction_confirmed_event_1.TransactionConfirmedEvent(entity);
    });
    test("Testing name event", () => {
        expect(event.name()).toBe("transaction.confirmed." + entity.id);
    });
    test("Testing payload event", () => {
        expect(event.payload()).toStrictEqual(entity.toJSON());
    });
});
//# sourceMappingURL=transaction-confirmed.event.spec.js.map