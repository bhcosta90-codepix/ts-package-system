import {PixKeyEntity, PixKeyKind} from "../pix-key.entity";
import {EntityAbstract} from "../../@shared/domain/entity.abstract";

describe("PixKeyEntity Unit Test", () => {
    test("Creating a new entity with id", () => {
        const value = 'd1904866-ae81-4ec2-9300-63a06b886d34';

        const entity = new PixKeyEntity({
            kind: 1,
            value
        });

        expect(entity.value).not.toBeNull();
        expect(entity.value).not.toBe(value);
        expect(entity.kind).toBe(PixKeyKind.ID);
        expect(entity).toBeInstanceOf(EntityAbstract)
    });

    test("Creating a new entity with phone", () => {
        const value = '(19) 98870-7070';

        const entity = new PixKeyEntity({
            kind: 2,
            value
        });

        expect(entity.value).toBe('19988707070');
        expect(entity.kind).toBe(PixKeyKind.PHONE);
        expect(entity).toBeInstanceOf(EntityAbstract)
    })

    test("Creating a new entity with document", () => {
        const value = '52.301.745/0001-94';

        const entity = new PixKeyEntity({
            kind: 4,
            value
        });

        expect(entity.value).toBe("52301745000194");
        expect(entity.kind).toBe(PixKeyKind.DOCUMENT);
        expect(entity).toBeInstanceOf(EntityAbstract)
    })

    test("Creating a new entity with email", () => {
        const value = 'test@test.com';

        const entity = new PixKeyEntity({
            kind: 3,
            value
        });

        expect(entity.value).toBe("test@test.com");
        expect(entity.kind).toBe(PixKeyKind.EMAIL);
        expect(entity).toBeInstanceOf(EntityAbstract)
    })
})