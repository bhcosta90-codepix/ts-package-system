"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionConfirmedEvent = void 0;
const transaction_event_base_1 = require("./transaction-event.base");
class TransactionConfirmedEvent extends transaction_event_base_1.TransactionEventBase {
    name() {
        return "transaction.confirmed";
    }
}
exports.TransactionConfirmedEvent = TransactionConfirmedEvent;
//# sourceMappingURL=transaction-confirmed.event.js.map