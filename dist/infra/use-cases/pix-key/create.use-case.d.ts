import { PixKeyRepository } from "../../../domain/repositories/pix-key.repository";
export declare namespace UseCase {
    type Input = {
        bank: string;
        kind: number;
        key?: string | null;
    };
    type Output = {
        id: string;
        bank: string;
        kind: number;
        key: string;
        created_at: Date;
    };
    class UseCaseException extends Error {
    }
    class Create {
        protected repository: PixKeyRepository;
        constructor(repository: PixKeyRepository);
        handle(input: Input): Promise<Output>;
    }
}
//# sourceMappingURL=create.use-case.d.ts.map