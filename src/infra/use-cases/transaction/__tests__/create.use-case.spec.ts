import {UseCase} from '../create.use-case'
import {PixKeyRepository} from "../../../../domain/repositories/pix-key.repository";
import {TransactionRepository} from "../../../../domain/repositories/transaction.repository";
import {NotFoundError} from "../../../../@shared/exception/not-found.error";
import {Transaction} from "../../../../domain/transaction.entity";
import {EventManagerInterface} from "../../../event/event-manager.interface";
import {EventInterface} from "../../../../@shared/domain/events/event.interface";

describe("CreateUseCase Unit Test", () => {
    test("should a new transaction", async () => {
        const mockPixKeyRepository: Partial<PixKeyRepository> = {
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(true))
        };

        const mockTransactionRepository : Partial<TransactionRepository> = {
            insertNewTransaction: jest.fn().mockImplementation(() => Promise.resolve()),
            updateStatus: jest.fn().mockImplementation(() => Promise.resolve()),
        }

        const mockEvent: EventManagerInterface = {
            dispatch: jest.fn()
        };

        const response = await new UseCase.CreateUseCase(
            mockPixKeyRepository as PixKeyRepository,
            mockTransactionRepository as TransactionRepository,
            mockEvent
        ).handle({
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002',
            kind: "email",
            key: 'test@test.com',
            value: 50,
            reference: 'd190d042-8326-11ee-b962-0242ac120002',
            description: 'testing'
        });

        expect(response.id).not.toBeNull();
        expect(response.status).toBe(Transaction.Status.PROCESSED);
        expect(response.created_at).not.toBeNull();
        expect(mockPixKeyRepository.verifyPixKey).toBeCalledTimes(1);
        expect(mockTransactionRepository.insertNewTransaction).toBeCalledTimes(1);
        expect(mockTransactionRepository.updateStatus).toBeCalledTimes(1);
        expect(mockEvent.dispatch).toBeCalledTimes(1);
    });

    test("exception when a pix exist", async () => {
        const mockPixKeyRepository: Partial<PixKeyRepository> = {
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(false))
        };

        const mockTransactionRepository : Partial<TransactionRepository> = {}

        const mockEvent: Partial<EventManagerInterface> = {};

        await expect(() => new UseCase.CreateUseCase(
            mockPixKeyRepository as PixKeyRepository,
            mockTransactionRepository as TransactionRepository,
            mockEvent as EventManagerInterface
        ).handle({
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002',
            kind: "email",
            key: 'test@test.com',
            value: 50,
            reference: 'd190d042-8326-11ee-b962-0242ac120002',
            description: 'testing'
        })).rejects.toThrow(new NotFoundError('Pix not found'))
    });
})