"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProcessedEvent = void 0;
const transaction_event_base_1 = require("./transaction-event.base");
class TransactionProcessedEvent extends transaction_event_base_1.TransactionEventBase {
    name() {
        return "transaction.processed." + this.transaction.id;
    }
}
exports.TransactionProcessedEvent = TransactionProcessedEvent;
//# sourceMappingURL=transaction-processed.event.js.map