import {UseCase} from "../create.use-case";
import {PixKeyRepository} from "../../../../domain/repositories/pix-key.repository";

describe("CreateUseCase Unit Test", () => {
    test("should a new pix key", async () => {

        const mockPixKeyRepository: Partial<PixKeyRepository> = {
            insertNewPix: jest.fn().mockImplementation(),
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(false))
        };

        const response = await new UseCase.CreateUseCase(mockPixKeyRepository as PixKeyRepository).handle({
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002',
            kind: "email",
            key: 'test@test.com'
        });

        expect(response).toMatchObject({
            kind: "email",
            key: 'test@test.com'
        });

        expect(response.bank).toBe('8ee0a7c0-8305-11ee-b962-0242ac120002');
        expect(response.id).not.toBeNull();
        expect(response.created_at).not.toBeNull();
        expect(mockPixKeyRepository.verifyPixKey).toHaveBeenCalledTimes(1);
        expect(mockPixKeyRepository.insertNewPix).toHaveBeenCalledTimes(1);
    })

    test("exception when a pix exist", async () => {

        const mockPixKeyRepository: Partial<PixKeyRepository> = {
            verifyPixKey: jest.fn().mockImplementation(() => Promise.resolve(true))
        };

        await expect(() => new UseCase.CreateUseCase(mockPixKeyRepository as PixKeyRepository).handle({
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120003',
            kind: "email",
            key: 'test@test.com'
        })).rejects.toThrow(new UseCase.UseCaseException('This pix was registered in our system'));
    })
})