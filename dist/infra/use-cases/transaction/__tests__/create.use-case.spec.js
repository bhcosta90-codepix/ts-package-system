"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_use_case_1 = require("../create.use-case");
const not_found_error_1 = require("../../../../@shared/exception/not-found.error");
const transaction_entity_1 = require("../../../../domain/transaction.entity");
describe("CreateUseCase Unit Test", () => {
    test("should a new transaction", async () => {
        const mockPixKeyRepository = {
            getBankToPix: jest.fn().mockImplementation(() => Promise.resolve("testing"))
        };
        const mockTransactionRepository = {
            insertNewTransaction: jest.fn().mockImplementation(() => Promise.resolve()),
            updateStatus: jest.fn().mockImplementation(() => Promise.resolve()),
        };
        const mockEvent = {
            dispatch: jest.fn()
        };
        const response = await new create_use_case_1.UseCase.CreateUseCase(mockPixKeyRepository, mockTransactionRepository, mockEvent).handle({
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002',
            kind: "email",
            key: 'test@test.com',
            value: 50,
            id: 'd190d042-8326-11ee-b962-0242ac120002',
            description: 'testing'
        });
        expect(response.id).not.toBeNull();
        expect(response.status).toBe(transaction_entity_1.Transaction.Status.PROCESSED);
        expect(response.created_at).not.toBeNull();
        expect(mockPixKeyRepository.getBankToPix).toBeCalledTimes(1);
        expect(mockTransactionRepository.insertNewTransaction).toBeCalledTimes(1);
        expect(mockTransactionRepository.updateStatus).toBeCalledTimes(1);
        expect(mockEvent.dispatch).toBeCalledTimes(1);
    });
    test("exception when a pix exist", async () => {
        const mockPixKeyRepository = {
            getBankToPix: jest.fn().mockImplementation(() => Promise.resolve(null))
        };
        const mockTransactionRepository = {};
        const mockEvent = {};
        await expect(() => new create_use_case_1.UseCase.CreateUseCase(mockPixKeyRepository, mockTransactionRepository, mockEvent).handle({
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002',
            kind: "email",
            key: 'test@test.com',
            value: 50,
            id: 'd190d042-8326-11ee-b962-0242ac120002',
            description: 'testing'
        })).rejects.toThrow(new not_found_error_1.NotFoundError('Pix not found'));
    });
});
//# sourceMappingURL=create.use-case.spec.js.map