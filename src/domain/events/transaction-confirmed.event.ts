import {TransactionEventBase} from "./transaction-event.base";

export class TransactionConfirmedEvent extends TransactionEventBase {
    name(): string {
        return "transaction.confirmed." + this.transaction.id;
    }
}