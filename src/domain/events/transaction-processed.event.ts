import {TransactionEventBase} from "./transaction-event.base";

export class TransactionProcessedEvent extends TransactionEventBase {
    name(): string {
        return "transaction.processed." + this.transaction.id;
    }
}