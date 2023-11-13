import {EntityAbstract} from "../../@shared/domain/entity.abstract";
import {PixKey} from '../pix-key.entity'

describe("PixKey.Entity Unit Test", () => {
    test("Creating a new entity with id", () => {
        const value = 'd1904866-ae81-4ec2-9300-63a06b886d34';

        const entity = new PixKey.Entity({
            kind: 1,
            key: value
        });

        expect(entity.key).not.toBeNull();
        expect(entity.key).not.toBe(value);
        expect(entity.kind).toBe(PixKey.Kind.ID);
        expect(entity).toBeInstanceOf(EntityAbstract)
    });

    test("Creating a new entity with phone", () => {
        const value = '(19) 98870-7070';

        const entity = new PixKey.Entity({
            kind: 2,
            key: value
        });

        expect(entity.key).toBe('19988707070');
        expect(entity.kind).toBe(PixKey.Kind.PHONE);
        expect(entity).toBeInstanceOf(EntityAbstract)
    })

    test("Creating a new entity with document", () => {
        const value = '52.301.745/0001-94';

        const entity = new PixKey.Entity({
            kind: 4,
            key: value
        });

        expect(entity.key).toBe("52301745000194");
        expect(entity.kind).toBe(PixKey.Kind.DOCUMENT);
        expect(entity).toBeInstanceOf(EntityAbstract)
    })

    test("Creating a new entity with email", () => {
        const value = 'test@test.com';

        const entity = new PixKey.Entity({
            kind: 3,
            key: value
        });

        expect(entity.key).toBe("test@test.com");
        expect(entity.kind).toBe(PixKey.Kind.EMAIL);
        expect(entity).toBeInstanceOf(EntityAbstract)
    });

    describe("Factory entity", () => {
        test("creating a simple factory entity", () => {
            const entity = new PixKey.Factory().make();
            expect(entity.toJSON()).toMatchObject({
                kind: 3,
                key: 'test@test.com',
            });
        });

        test("creating a factory entity with data", () => {
            const entity = new PixKey.Factory()
                .withKind(2)
                .withKey('(19) 98870-4040')
                .make();

            expect(entity.toJSON()).toMatchObject({
                kind: 2,
                key: '19988704040',
            });
        })
    })
})