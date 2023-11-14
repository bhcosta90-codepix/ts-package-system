import {UseCase} from '../create.use-case'
import {PixKeyRepository} from "../../../../domain/repositories/pix-key.repository";
import {TransactionRepository} from "../../../../domain/repositories/transaction.repository";
import {NotFoundError} from "../../../../@shared/exception/not-found.error";

describe("CreateUseCase Unit Test", () => {
    test("should a new transaction", async () => {
        const mockPixKeyRepository: Partial<PixKeyRepository> = {
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(true))
        };

        const mockTransactionRepository : Partial<TransactionRepository> = {
            insertNewTransaction: jest.fn().mockImplementation(() => Promise.resolve())
        }

        const response = await new UseCase.CreateUseCase(
            mockPixKeyRepository as PixKeyRepository,
            mockTransactionRepository as TransactionRepository,
        ).handle({
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002',
            kind: "email",
            key: 'test@test.com',
            value: 50,
            reference: 'd190d042-8326-11ee-b962-0242ac120002',
            description: 'testing'
        });

        expect(response.id).not.toBeNull();
    });

    test("exception when a pix exist", async () => {
        const mockPixKeyRepository: Partial<PixKeyRepository> = {
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(false))
        };

        const mockTransactionRepository : Partial<TransactionRepository> = {}

        await expect(() => new UseCase.CreateUseCase(
            mockPixKeyRepository as PixKeyRepository,
            mockTransactionRepository as TransactionRepository,
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