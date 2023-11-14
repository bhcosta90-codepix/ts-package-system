import {EntityAbstract, EntityProps} from "../@shared/domain/entity.abstract";
import {PixKeyValueObject} from "./vo/pix-key.vo";
import {TransactionException} from "./exceptions/transaction.exception";
import {TransactionProcessedEvent} from "./events/transaction-processed.event";
import {TransactionConfirmedEvent} from "./events/transaction-confirmed.event";
import {TransactionCompletedEvent} from "./events/transaction-completed.event";

export namespace Transaction {

    export enum Status {
        OPEN = 0,
        CONFIRMED = 1,
        PROCESSED = 2,
        COMPLETED = 2,
    }

    export type Props = {
        bank: string;
        reference: string;
        description: string;
        value: number;
        pixKey: PixKeyValueObject.ValueObject;
        status?: Status | null;
    };

    export class Entity extends EntityAbstract {
        protected _bank: string;
        protected _reference: string;
        protected _description: string;
        protected _value: number;
        protected _pixKey: PixKeyValueObject.ValueObject;
        protected _status: Transaction.Status

        constructor(props: Transaction.Props & EntityProps) {
            super(props);
            this._bank = props.bank;
            this._reference = props.reference;
            this._description = props.description;
            this._value = props.value;
            this._pixKey = props.pixKey;
            this._status = props.status ?? Transaction.Status.OPEN;
        }

        changeProcessed() {
            if (this._status != Transaction.Status.OPEN) {
                throw new TransactionException("Only open transactions can change to this status");
            }

            this._status = Transaction.Status.PROCESSED;
            this.event.add(new TransactionProcessedEvent(this));
        }

        changeConfirmed() {
            if (this._status != Transaction.Status.PROCESSED) {
                throw new TransactionException("Only processed charges can change to this status");
            }

            this._status = Transaction.Status.CONFIRMED;
            this.event.add(new TransactionConfirmedEvent(this));
        }

        changeCompleted() {
            if (this._status != Transaction.Status.CONFIRMED) {
                throw new TransactionException("Only confirmed charges can be completed");
            }

            this._status = Transaction.Status.COMPLETED;
            this.event.add(new TransactionCompletedEvent(this));
        }

        get status(): Transaction.Status {
            return this._status;
        }
    }

    export class Factory {
        private _kind: string = "email";
        private _key: string = 'test@test.com';
        private _value: number = 50;
        private _description: string = 'testing';
        private _bank: string = '5ebe14a0-8252-11ee-b962-0242ac120002';
        private _reference: string = '65860928-8252-11ee-b962-0242ac120002';
        private _status: Transaction.Status = Transaction.Status.OPEN;


        withKind(value: string): this {
            this._kind = value;
            return this;
        }

        withKey(value: string): this {
            this._key = value;
            return this;
        }

        withValue(value: number): this {
            this._value = value;
            return this;
        }

        withDescription(value: string): this {
            this._description = value;
            return this;
        }

        withBank(value: string): this {
            this._bank = value;
            return this;
        }

        withReference(value: string): this {
            this._reference = value;
            return this;
        }

        withStatus(value: Transaction.Status): this {
            this._status = value;
            return this;
        }

        make(): Transaction.Entity {
            return new Transaction.Entity({
                pixKey: new PixKeyValueObject.ValueObject({
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
}