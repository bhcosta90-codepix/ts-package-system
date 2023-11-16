import {TransactionEventBase} from "./transaction-event.base";

export class TransactionCompletedEvent extends TransactionEventBase {
    name(): string {
        return "transaction.completed";
    }
}