import {TransactionProcessedEvent as TransactionEvent} from "../transaction-processed.event";
import {Transaction} from "../../transaction.entity";

describe("TransactionProcessedEvent Unit Test", () => {
    let event: TransactionEvent;
    let entity: Transaction.Entity;

    beforeEach(() => {
        entity = new Transaction.Factory().make();
        event = new TransactionEvent(entity, "bank")
    })

    test("Testing name event", () => {
        expect(event.name()).toBe("transaction.processed");
    })

    test("Testing payload event", () => {
        expect(event.payload()).toStrictEqual({
            "transaction": entity.toJSON(),
            "bank": "bank"
        });
    })
})