import {PixKeyValueObject} from "../../../domain/vo/pix-key.vo";
import {PixKeyRepository} from "../../../domain/repositories/pix-key.repository";
import {Transaction} from "../../../domain/transaction.entity";
import {TransactionRepository} from "../../../domain/repositories/transaction.repository";
import {NotFoundError} from "../../../@shared/exception/not-found.error";

export namespace UseCase {

    export type Input = {
        bank: string;
        reference: string;
        description: string;
        value: number;
        kind: string;
        key: string;
    };

    export type Output = {
        id: string;
    };

    export class UseCaseException extends Error {

    }

    export class CreateUseCase {
        constructor(protected repositoryPixKey: PixKeyRepository, protected repository: TransactionRepository) {
            //
        }

        async handle(input: Input): Promise<Output> {
            const pixKey = new PixKeyValueObject.ValueObject({
                kind: input.kind,
                key: input.key
            });

            if (!await this.repositoryPixKey.verifyPixKey(pixKey)) {
                throw new NotFoundError('Pix not found');
            }

            const entity = new Transaction.Entity({
                bank: input.bank,
                pixKey,
                value: input.value,
                reference: input.reference,
                description: input.description,
            });

            await this.repository.insertNewTransaction(entity);

            return {
                id: entity.id,
            };
        }
    }
}