import {EntityAbstract, EntityProps} from "../@shared/domain/entity.abstract";
import {PixKeyValueObject} from "./vo/pix-key.vo";

export namespace Transaction {

    export enum Status {
        CREATING = 0,
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
        status: Status | null;
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
            this._status = props.status ?? Transaction.Status.CREATING;
        }
    }

    export class Factory {
        private _kind: number = 3;
        private _key: string = 'test@test.com';
        private _value: number = 50;
        private _description: string = 'testing';
        private _bank: string = '5ebe14a0-8252-11ee-b962-0242ac120002';
        private _reference: string = '65860928-8252-11ee-b962-0242ac120002';


        withKind(value: number): this {
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
            });
        }
    }
}