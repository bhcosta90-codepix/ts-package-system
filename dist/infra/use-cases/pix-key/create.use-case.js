"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
const pix_key_entity_1 = require("../../../domain/pix-key.entity");
const pix_key_vo_1 = require("../../../domain/vo/pix-key.vo");
var UseCase;
(function (UseCase) {
    class UseCaseException extends Error {
    }
    UseCase.UseCaseException = UseCaseException;
    class CreateUseCase {
        constructor(repository) {
            this.repository = repository;
        }
        async handle(input) {
            const pixKey = new pix_key_vo_1.PixKeyValueObject.ValueObject({
                kind: input.kind,
                key: input.key
            });
            if (await this.repository.verifyPixKey(pixKey)) {
                throw new UseCaseException('This pix was registered in our system');
            }
            const entity = new pix_key_entity_1.PixKey.Entity({
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
    UseCase.CreateUseCase = CreateUseCase;
})(UseCase || (exports.UseCase = UseCase = {}));
//# sourceMappingURL=create.use-case.js.map