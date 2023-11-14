import { PixKey } from "../pix-key.entity";
import { PixKeyValueObject } from "../vo/pix-key.vo";
export interface PixKeyRepository {
    insertNewPix(pixKey: PixKey.Entity): void;
    verifyPixKey(pixKey: PixKeyValueObject.ValueObject): Promise<boolean>;
}
//# sourceMappingURL=pix-key.repository.d.ts.map