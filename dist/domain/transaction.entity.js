"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const entity_abstract_1 = require("../@shared/domain/entity.abstract");
const pix_key_vo_1 = require("./vo/pix-key.vo");
const transaction_exception_1 = require("./exceptions/transaction.exception");
const transaction_processed_event_1 = require("./events/transaction-processed.event");
const transaction_confirmed_event_1 = require("./events/transaction-confirmed.event");
const transaction_completed_event_1 = require("./events/transaction-completed.event");
var Transaction;
(function (Transaction) {
    let Status;
    (function (Status) {
        Status[Status["OPEN"] = 0] = "OPEN";
        Status[Status["CONFIRMED"] = 1] = "CONFIRMED";
        Status[Status["PROCESSED"] = 2] = "PROCESSED";
        Status[Status["COMPLETED"] = 2] = "COMPLETED";
    })(Status = Transaction.Status || (Transaction.Status = {}));
    class Entity extends entity_abstract_1.EntityAbstract {
        constructor(props) {
            var _a;
            super(props);
            this._bank = props.bank;
            this._reference = props.reference;
            this._description = props.description;
            this._value = props.value;
            this._pixKey = props.pixKey;
            this._status = (_a = props.status) !== null && _a !== void 0 ? _a : Transaction.Status.OPEN;
        }
        changeProcessed() {
            if (this._status != Transaction.Status.OPEN) {
                throw new transaction_exception_1.TransactionException("Only open transactions can change to this status");
            }
            this._status = Transaction.Status.PROCESSED;
            this.event.add(new transaction_processed_event_1.TransactionProcessedEvent(this));
        }
        changeConfirmed() {
            if (this._status != Transaction.Status.PROCESSED) {
                throw new transaction_exception_1.TransactionException("Only processed charges can change to this status");
            }
            this._status = Transaction.Status.CONFIRMED;
            this.event.add(new transaction_confirmed_event_1.TransactionConfirmedEvent(this));
        }
        changeCompleted() {
            if (this._status != Transaction.Status.CONFIRMED) {
                throw new transaction_exception_1.TransactionException("Only confirmed charges can be completed");
            }
            this._status = Transaction.Status.COMPLETED;
            this.event.add(new transaction_completed_event_1.TransactionCompletedEvent(this));
        }
        get status() {
            return this._status;
        }
    }
    Transaction.Entity = Entity;
    class Factory {
        constructor() {
            this._kind = 3;
            this._key = 'test@test.com';
            this._value = 50;
            this._description = 'testing';
            this._bank = '5ebe14a0-8252-11ee-b962-0242ac120002';
            this._reference = '65860928-8252-11ee-b962-0242ac120002';
            this._status = Transaction.Status.OPEN;
        }
        withKind(value) {
            this._kind = value;
            return this;
        }
        withKey(value) {
            this._key = value;
            return this;
        }
        withValue(value) {
            this._value = value;
            return this;
        }
        withDescription(value) {
            this._description = value;
            return this;
        }
        withBank(value) {
            this._bank = value;
            return this;
        }
        withReference(value) {
            this._reference = value;
            return this;
        }
        withStatus(value) {
            this._status = value;
            return this;
        }
        make() {
            return new Transaction.Entity({
                pixKey: new pix_key_vo_1.PixKeyValueObject.ValueObject({
                    kind: this._kind,
                    key: this._key
                }),
                bank: this._bank,
                value: this._value,
                reference: this._reference,
                description: this._description,
                status: this._status
            });
        }
    }
    Transaction.Factory = Factory;
})(Transaction || (exports.Transaction = Transaction = {}));
//# sourceMappingURL=transaction.entity.js.map