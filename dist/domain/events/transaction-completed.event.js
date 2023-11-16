"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionCompletedEvent = void 0;
const transaction_event_base_1 = require("./transaction-event.base");
class TransactionCompletedEvent extends transaction_event_base_1.TransactionEventBase {
    name() {
        return "transaction.completed";
    }
}
exports.TransactionCompletedEvent = TransactionCompletedEvent;
//# sourceMappingURL=transaction-completed.event.js.map