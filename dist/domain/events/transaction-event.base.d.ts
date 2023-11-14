import { EventInterface } from "../../@shared/domain/events/event.interface";
import { Transaction } from '../transaction.entity';
export declare abstract class TransactionEventBase implements EventInterface {
    protected transaction: Transaction.Entity;
    constructor(transaction: Transaction.Entity);
    abstract name(): string;
    payload(): any;
}
//# sourceMappingURL=transaction-event.base.d.ts.map