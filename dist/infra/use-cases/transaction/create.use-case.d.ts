import { PixKeyRepository } from "../../../domain/repositories/pix-key.repository";
import { Transaction } from "../../../domain/transaction.entity";
import { TransactionRepository } from "../../../domain/repositories/transaction.repository";
export declare namespace UseCase {
    type Input = {
        bank: string;
        reference: string;
        description: string;
        value: number;
        kind: string;
        key: string;
    };
    type Output = {
        id: string;
        status: Transaction.Status;
        created_at: Date;
    };
    class UseCaseException extends Error {
    }
    class CreateUseCase {
        protected repositoryPixKey: PixKeyRepository;
        protected repository: TransactionRepository;
        constructor(repositoryPixKey: PixKeyRepository, repository: TransactionRepository);
        handle(input: Input): Promise<Output>;
    }
}
//# sourceMappingURL=create.use-case.d.ts.map