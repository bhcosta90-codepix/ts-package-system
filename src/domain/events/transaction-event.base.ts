import {EventInterface} from "../../@shared/domain/events/event.interface";
import {Transaction} from '../transaction.entity'

export abstract class TransactionEventBase implements EventInterface {

    constructor(protected transaction: Transaction.Entity) {
        //
    }

    abstract name(): string;

    payload(): any {
        return this.transaction.toJSON();
    }

}