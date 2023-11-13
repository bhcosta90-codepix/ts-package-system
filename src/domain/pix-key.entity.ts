import {EntityAbstract, EntityProps} from "../@shared/domain/entity.abstract";
import {randomUUID} from "crypto"

export enum PixKeyKind {
    ID = 1,
    PHONE = 2,
    EMAIL = 3,
    DOCUMENT = 4,
}

export type PixKeyProps = {
    kind: PixKeyKind;
    value?: string | null;
};

export class PixKeyEntity extends EntityAbstract {
    protected _kind: number;
    protected _value: string;

    constructor(props: PixKeyProps & EntityProps) {
        super(props);

        const mappingPixKeyKind: Record<number, PixKeyKind> = {
            1: PixKeyKind.ID,
            2: PixKeyKind.PHONE,
            3: PixKeyKind.EMAIL,
            4: PixKeyKind.DOCUMENT,
        };

        this._kind = mappingPixKeyKind[props.kind];

        let value = props.value;

        if (this._kind === PixKeyKind.ID) {
            value = randomUUID();
        }

        switch(this._kind) {
            case PixKeyKind.PHONE:
            case PixKeyKind.DOCUMENT:
                value = value.replace(/[^0-9]/g,'');
                break;
        }

        this._value = value;
    }


    get kind(): number {
        return this._kind;
    }

    get value(): string {
        return this._value;
    }
}
