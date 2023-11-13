import {EntityAbstract} from "../@shared/domain/entity.abstract";
import {getKind, PixKeyKind} from "./pix-key.entity";

export type TransactionProps = {
    bank: string;
    reference: string;
    description: string;
    value: number;
    kind: number;
    key: string;
};
export class TransactionEntity extends EntityAbstract {
    protected _bank: string;
    protected _reference: string;
    protected _description: string;
    protected _value: number;
    protected _kind: PixKeyKind;
    protected _key: string;

    constructor(props: TransactionProps) {
        super(props);
        this._bank = props.bank;
        this._reference = props.reference;
        this._description = props.description;
        this._value = props.value;
        this._kind = getKind(props.kind);
        this._key = props.key;
    }
}