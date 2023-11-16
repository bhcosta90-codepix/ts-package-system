import { PixKeyRepository } from "../../../domain/repositories/pix-key.repository";
import { Transaction } from "../../../domain/transaction.entity";
import { TransactionRepository } from "../../../domain/repositories/transaction.repository";
import { EventManagerInterface } from "../../event/event-manager.interface";
export declare namespace UseCase {
    type Input = {
        id: string;
        bank: string;
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
        protected event: EventManagerInterface;
        constructor(repositoryPixKey: PixKeyRepository, repository: TransactionRepository, event: EventManagerInterface);
        handle(input: Input): Promise<Output>;
    }
}
//# sourceMappingURL=create.use-case.d.ts.map