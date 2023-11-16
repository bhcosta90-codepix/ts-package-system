import {PixKey} from "../pix-key.entity";
import {PixKeyValueObject} from "../vo/pix-key.vo";

export interface PixKeyRepository {
    insertNewPix(pixKey: PixKey.Entity): Promise<void>;

    verifyPixKey(pixKey: PixKeyValueObject.ValueObject): Promise<boolean>;

    getBankToPix(pixKey: PixKeyValueObject.ValueObject): Promise<string | null>;
}