import {TransactionEventBase} from "./transaction-event.base";
import {Transaction} from "../transaction.entity";

export class TransactionProcessedEvent extends TransactionEventBase {
    constructor(protected transaction: Transaction.Entity, protected bank: string) {
        super(transaction);
    }

    payload(): any {
        return {
            "transaction": super.payload(),
            "bank": this.bank
        };
    }

    name(): string {
        return "transaction.processed";
    }
}