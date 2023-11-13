import {EntityAbstract, EntityProps} from "../@shared/domain/entity.abstract";
import {PixKeyValueObject} from "./vo/pix-key.vo";

export namespace PixKey {
    export type Props = {
        pixKey: PixKeyValueObject.ValueObject
    };

    export class Entity extends EntityAbstract {
        protected _pixKey: PixKeyValueObject.ValueObject;

        constructor(props: Props & EntityProps) {
            super(props);
            this._pixKey = props.pixKey
        }

        get kind(): number {
            return this._pixKey.kind;
        }

        get key(): string {
            return this._pixKey.key;
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
            });
        }
    }
}