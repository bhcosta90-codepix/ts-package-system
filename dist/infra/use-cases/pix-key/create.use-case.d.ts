import { PixKeyRepository } from "../../../domain/repositories/pix-key.repository";
export declare namespace UseCase {
    type Input = {
        bank: string;
        kind: string;
        key?: string | null;
    };
    type Output = {
        id: string;
        bank: string;
        kind: string;
        key: string;
        created_at: Date;
    };
    class UseCaseException extends Error {
    }
    class CreateUseCase {
        protected repository: PixKeyRepository;
        constructor(repository: PixKeyRepository);
        handle(input: Input): Promise<Output>;
    }
}
//# sourceMappingURL=create.use-case.d.ts.map