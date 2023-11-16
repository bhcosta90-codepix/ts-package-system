import { TransactionEventBase } from "./transaction-event.base";
import { Transaction } from "../transaction.entity";
export declare class TransactionProcessedEvent extends TransactionEventBase {
    protected transaction: Transaction.Entity;
    protected bank: string;
    constructor(transaction: Transaction.Entity, bank: string);
    payload(): any;
    name(): string;
}
//# sourceMappingURL=transaction-processed.event.d.ts.map