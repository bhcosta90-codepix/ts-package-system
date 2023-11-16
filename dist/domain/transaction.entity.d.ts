import { EntityAbstract, EntityProps } from "../@shared/domain/entity.abstract";
import { PixKeyValueObject } from "./vo/pix-key.vo";
export declare namespace Transaction {
    enum Status {
        OPEN = 0,
        CONFIRMED = 1,
        PROCESSED = 2,
        COMPLETED = 2
    }
    type Props = {
        bank: string;
        reference: string;
        description: string;
        value: number;
        pixKey: PixKeyValueObject.ValueObject;
        status?: Status | null;
    };
    class Entity extends EntityAbstract {
        protected _bank: string;
        protected _reference: string;
        protected _description: string;
        protected _value: number;
        protected _pixKey: PixKeyValueObject.ValueObject;
        protected _status: Transaction.Status;
        constructor(props: Transaction.Props & EntityProps);
        changeProcessed(destinBank: string): void;
        changeConfirmed(): void;
        changeCompleted(): void;
        get status(): Transaction.Status;
        get kind(): number;
        get key(): string;
    }
    class Factory {
        private _kind;
        private _key;
        private _value;
        private _description;
        private _bank;
        private _reference;
        private _status;
        withKind(value: string): this;
        withKey(value: string): this;
        withValue(value: number): this;
        withDescription(value: string): this;
        withBank(value: string): this;
        withReference(value: string): this;
        withStatus(value: Transaction.Status): this;
        make(): Transaction.Entity;
    }
}
//# sourceMappingURL=transaction.entity.d.ts.map