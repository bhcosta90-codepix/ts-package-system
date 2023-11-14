import { EntityAbstract, EntityProps } from "../@shared/domain/entity.abstract";
import { PixKeyValueObject } from "./vo/pix-key.vo";
export declare namespace PixKey {
    type Props = {
        pixKey: PixKeyValueObject.ValueObject;
    };
    class Entity extends EntityAbstract {
        protected _pixKey: PixKeyValueObject.ValueObject;
        constructor(props: Props & EntityProps);
        get kind(): number;
        get key(): string;
    }
    class Factory {
        private _kind;
        private _key;
        withKind(value: number): this;
        withKey(value: string): this;
        make(): PixKey.Entity;
    }
}
//# sourceMappingURL=pix-key.entity.d.ts.map