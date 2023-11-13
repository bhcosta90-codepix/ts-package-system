import {TransactionProcessedEvent as TransactionEvent} from "../transaction-processed.event";
import {Transaction} from "../../transaction.entity";

describe("TransactionProcessedEvent Unit Test", () => {
    let event: TransactionEvent;
    let entity: Transaction.Entity;

    beforeEach(() => {
        entity = new Transaction.Factory().make();
        event = new TransactionEvent(entity)
    })

    test("Testing name event", () => {
        expect(event.name()).toBe("transaction.processed." + entity.id);
    })

    test("Testing payload event", () => {
        expect(event.payload()).toStrictEqual(entity.toJSON());
    })
})