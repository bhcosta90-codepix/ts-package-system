"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProcessedEvent = void 0;
const transaction_event_base_1 = require("./transaction-event.base");
class TransactionProcessedEvent extends transaction_event_base_1.TransactionEventBase {
    constructor(transaction, bank) {
        super(transaction);
        this.transaction = transaction;
        this.bank = bank;
    }
    payload() {
        return {
            "transaction": super.payload(),
            "bank": this.bank
        };
    }
    name() {
        return "transaction.processed";
    }
}
exports.TransactionProcessedEvent = TransactionProcessedEvent;
//# sourceMappingURL=transaction-processed.event.js.map