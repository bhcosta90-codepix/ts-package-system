import {EntityAbstract, EntityProps} from "../@shared/domain/entity.abstract";
import {PixKeyValueObject} from "./vo/pix-key.vo";

export namespace PixKey {
    export type Props = {
        bank: string,
        pixKey: PixKeyValueObject.ValueObject,
    };

    export class Entity extends EntityAbstract {
        protected _pixKey: PixKeyValueObject.ValueObject;
        private _bank: string;

        constructor(props: Props & EntityProps) {
            super(props);
            this._pixKey = props.pixKey;
            this._bank = props.bank
        }

        get kind(): number {
            return this._pixKey.kind;
        }

        get key(): string {
            return this._pixKey.key;
        }

        get bank(): string {
            return this._bank;
        }
    }

    export class Factory {
        private _kind: number = 3;
        private _key: string = 'test@test.com';

        withKind(value: number): this {
            this._kind = value;
            return this;
        }

        withKey(value: string): this {
            this._key = value;
            return this;
        }

        make(): PixKey.Entity {
            return new PixKey.Entity({
                pixKey: new PixKeyValueObject.ValueObject({
                    kind: this._kind,
                    key: this._key
                }),
                bank: 'f7e2692c-8303-11ee-b962-0242ac120002'
            });
        }
    }
}