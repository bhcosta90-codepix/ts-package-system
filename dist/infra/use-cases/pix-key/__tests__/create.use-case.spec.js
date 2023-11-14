"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_use_case_1 = require("../create.use-case");
describe("UseCase.Create Unit Test", () => {
    test("should a new pix key", async () => {
        const mockPixKeyRepository = {
            insertNewPix: jest.fn().mockImplementation(),
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(false))
        };
        const response = await new create_use_case_1.UseCase.Create(mockPixKeyRepository).handle({
            kind: 3,
            key: 'test@test.com'
        });
        expect(response).toMatchObject({
            kind: 3,
            key: 'test@test.com'
        });
        expect(response.id).not.toBeNull();
        expect(response.created_at).not.toBeNull();
        expect(mockPixKeyRepository.verifyPixKey).toHaveBeenCalledTimes(1);
        expect(mockPixKeyRepository.insertNewPix).toHaveBeenCalledTimes(1);
    });
    test("exception when a pix exist", async () => {
        const mockPixKeyRepository = {
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(true))
        };
        await expect(() => new create_use_case_1.UseCase.Create(mockPixKeyRepository).handle({
            kind: 3,
            key: 'test@test.com'
        })).rejects.toThrow(new create_use_case_1.UseCase.UseCaseException('This pix was registered in our system'));
    });
});
//# sourceMappingURL=create.use-case.spec.js.map