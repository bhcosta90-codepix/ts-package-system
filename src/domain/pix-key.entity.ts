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
    key?: string | null;
};

export function getKind(value: number): PixKeyKind {
    const mappingPixKeyKind: Record<number, PixKeyKind> = {
        1: PixKeyKind.ID,
        2: PixKeyKind.PHONE,
        3: PixKeyKind.EMAIL,
        4: PixKeyKind.DOCUMENT,
    };

    return mappingPixKeyKind[value];
}

export class PixKeyEntity extends EntityAbstract {
    protected _kind: number;
    protected _key: string;

    constructor(props: PixKeyProps & EntityProps) {
        super(props);

        this._kind = getKind(props.kind);

        let value = props.key;

        if (this._kind === PixKeyKind.ID) {
            value = randomUUID();
        }

        switch (this._kind) {
            case PixKeyKind.PHONE:
            case PixKeyKind.DOCUMENT:
                value = value.replace(/[^0-9]/g, '');
                break;
        }

        this._key = value;
    }


    get kind(): number {
        return this._kind;
    }

    get key(): string {
        return this._key;
    }
}
