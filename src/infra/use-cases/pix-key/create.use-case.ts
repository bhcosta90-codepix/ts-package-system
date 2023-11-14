import {PixKey} from "../../../domain/pix-key.entity";
import {PixKeyValueObject} from "../../../domain/vo/pix-key.vo";
import {PixKeyRepository} from "../../../domain/repositories/pix-key.repository";

export namespace UseCase {

    export type Input = {
        bank: string;
        kind: string;
        key?: string | null;
    };

    export type Output = {
        id: string;
        bank: string;
        kind: string;
        key: string;
        created_at: Date;
    };

    export class UseCaseException extends Error {

    }

    export class CreateUseCase {
        constructor(protected repository: PixKeyRepository) {
            //
        }

        async handle(input: Input): Promise<Output> {
            const pixKey = new PixKeyValueObject.ValueObject({
                kind: input.kind,
                key: input.key
            });

            if (await this.repository.verifyPixKey(pixKey)) {
                throw new UseCaseException('This pix was registered in our system');
            }

            const entity = new PixKey.Entity({
                bank: input.bank,
                pixKey
            });

            this.repository.insertNewPix(entity);

            return {
                bank: entity.bank,
                id: entity.id,
                kind: input.kind,
                key: entity.key,
                created_at: entity.created_at
            };
        }
    }
}