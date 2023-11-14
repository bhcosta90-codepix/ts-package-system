import {randomUUID} from "crypto";

export namespace PixKeyValueObject {
    export enum Kind {
        ID = 1,
        PHONE = 2,
        EMAIL = 3,
        DOCUMENT = 4,
    }

    export type Props = {
        kind: string;
        key?: string | null;
    };

    export class ValueObject {
        protected _kind: Kind;
        protected _key?: string | null;

        constructor(props: Props) {
            const mappingPixKeyKind: Record<string, Kind> = {
                "id": Kind.ID,
                "phone": Kind.PHONE,
                "email": Kind.EMAIL,
                "document": Kind.DOCUMENT,
            };

            this._kind = mappingPixKeyKind[props.kind];

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

        get kind(): PixKeyValueObject.Kind {
            return this._kind;
        }

        get key(): string {
            return this._key;
        }
    }
}