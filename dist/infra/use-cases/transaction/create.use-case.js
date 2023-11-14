"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
const pix_key_vo_1 = require("../../../domain/vo/pix-key.vo");
const transaction_entity_1 = require("../../../domain/transaction.entity");
const not_found_error_1 = require("../../../@shared/exception/not-found.error");
var UseCase;
(function (UseCase) {
    class UseCaseException extends Error {
    }
    UseCase.UseCaseException = UseCaseException;
    class CreateUseCase {
        constructor(repositoryPixKey, repository) {
            this.repositoryPixKey = repositoryPixKey;
            this.repository = repository;
        }
        async handle(input) {
            const pixKey = new pix_key_vo_1.PixKeyValueObject.ValueObject({
                kind: input.kind,
                key: input.key
            });
            if (!await this.repositoryPixKey.verifyPixKey(pixKey)) {
                throw new not_found_error_1.NotFoundError('Pix not found');
            }
            const entity = new transaction_entity_1.Transaction.Entity({
                bank: input.bank,
                pixKey,
                value: input.value,
                reference: input.reference,
                description: input.description,
            });
            await this.repository.insertNewTransaction(entity);
            entity.changeProcessed();
            await this.repository.updateStatus(entity.id, entity.status);
            return {
                id: entity.id,
                status: entity.status,
                created_at: entity.created_at
            };
        }
    }
    UseCase.CreateUseCase = CreateUseCase;
})(UseCase || (exports.UseCase = UseCase = {}));
//# sourceMappingURL=create.use-case.js.map