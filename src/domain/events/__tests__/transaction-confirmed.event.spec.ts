import {TransactionConfirmedEvent as TransactionEvent} from "../transaction-confirmed.event";
import {Transaction} from "../../transaction.entity";

describe("TransactionConfirmedEvent Unit Test", () => {
    let event: TransactionEvent;
    let entity: Transaction.Entity;

    beforeEach(() => {
        entity = new Transaction.Factory().make();
        event = new TransactionEvent(entity)
    })

    test("Testing name event", () => {
        expect(event.name()).toBe("transaction.confirmed");
    })

    test("Testing payload event", () => {
        expect(event.payload()).toStrictEqual(entity.toJSON());
    })
})