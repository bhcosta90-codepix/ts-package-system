export declare namespace PixKeyValueObject {
    enum Kind {
        ID = 1,
        PHONE = 2,
        EMAIL = 3,
        DOCUMENT = 4
    }
    type Props = {
        kind: string;
        key?: string | null;
    };
    class ValueObject {
        protected _kind: Kind;
        protected _key?: string | null;
        constructor(props: Props);
        get kind(): PixKeyValueObject.Kind;
        get key(): string;
    }
}
//# sourceMappingURL=pix-key.vo.d.ts.map