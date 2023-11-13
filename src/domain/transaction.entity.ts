import {EntityAbstract, EntityProps} from "../@shared/domain/entity.abstract";
import {PixKey} from "./pix-key.entity";

export namespace Transaction {

    export type Props = {
        bank: string;
        reference: string;
        description: string;
        value: number;
        kind: number;
        key: string;
    };

    export class Entity extends EntityAbstract {
        protected _bank: string;
        protected _reference: string;
        protected _description: string;
        protected _value: number;
        protected _kind: PixKey.Kind;
        protected _key: string;

        constructor(props: Transaction.Props & EntityProps) {
            super(props);
            this._bank = props.bank;
            this._reference = props.reference;
            this._description = props.description;
            this._value = props.value;
            this._kind = PixKey.getKind(props.kind);
            this._key = props.key;
        }
    }
}