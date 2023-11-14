import { EntityAbstract, EntityProps } from "../@shared/domain/entity.abstract";
import { PixKeyValueObject } from "./vo/pix-key.vo";
export declare namespace PixKey {
    type Props = {
        bank: string;
        pixKey: PixKeyValueObject.ValueObject;
    };
    class Entity extends EntityAbstract {
        protected _pixKey: PixKeyValueObject.ValueObject;
        protected _bank: string;
        constructor(props: Props & EntityProps);
        get kind(): number;
        get key(): string;
        get bank(): string;
    }
    class Factory {
        private _kind;
        private _key;
        withKind(value: string): this;
        withKey(value: string): this;
        make(): PixKey.Entity;
    }
}
//# sourceMappingURL=pix-key.entity.d.ts.map