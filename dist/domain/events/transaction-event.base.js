"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionEventBase = void 0;
class TransactionEventBase {
    constructor(transaction) {
        this.transaction = transaction;
    }
    payload() {
        return this.transaction.toJSON();
    }
}
exports.TransactionEventBase = TransactionEventBase;
//# sourceMappingURL=transaction-event.base.js.map