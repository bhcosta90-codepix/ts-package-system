import {EntityAbstract, EntityProps} from "../@shared/domain/entity.abstract";
import {randomUUID} from "crypto"

export namespace PixKey {
    export enum Kind {
        ID = 1,
        PHONE = 2,
        EMAIL = 3,
        DOCUMENT = 4,
    }

    export type Props = {
        kind: Kind;
        key?: string | null;
    };

    export function getKind(value: number): Kind {
        const mappingPixKeyKind: Record<number, Kind> = {
            1: Kind.ID,
            2: Kind.PHONE,
            3: Kind.EMAIL,
            4: Kind.DOCUMENT,
        };

        return mappingPixKeyKind[value];
    }

    export class Entity extends EntityAbstract {
        protected _kind: number;
        protected _key: string;

        constructor(props: Props & EntityProps) {
            super(props);

            this._kind = getKind(props.kind);

            let value = props.key;

            if (this._kind === Kind.ID) {
                value = randomUUID();
            }

            switch (this._kind) {
                case Kind.PHONE:
                case Kind.DOCUMENT:
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
}