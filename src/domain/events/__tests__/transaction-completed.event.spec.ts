import {TransactionCompletedEvent as TransactionEvent} from "../transaction-completed.event";
import {Transaction} from "../../transaction.entity";

describe("TransactionCompletedEvent Unit Test", () => {
    let event: TransactionEvent;
    let entity: Transaction.Entity;

    beforeEach(() => {
        entity = new Transaction.Factory().make();
        event = new TransactionEvent(entity)
    })

    test("Testing name event", () => {
        expect(event.name()).toBe("transaction.completed");
    })

    test("Testing payload event", () => {
        expect(event.payload()).toStrictEqual(entity.toJSON());
    })
})