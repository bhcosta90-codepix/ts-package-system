import {EntityAbstract} from "../../@shared/domain/entity.abstract";
import {PixKey} from '../pix-key.entity'
import {PixKeyValueObject} from "../vo/pix-key.vo";

describe("PixKey.Entity Unit Test", () => {
    test("Creating a new entity with id", () => {
        const value = 'd1904866-ae81-4ec2-9300-63a06b886d34';

        const entity = new PixKey.Entity({
            pixKey: new PixKeyValueObject.ValueObject({
                kind: 1,
                key: value
            }),
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002'
        });

        expect(entity.key).not.toBeNull();
        expect(entity.key).not.toBe(value);
        expect(entity.kind).toBe(PixKeyValueObject.Kind.ID);
        expect(entity).toBeInstanceOf(EntityAbstract)
        expect(entity.bank).toBe('8ee0a7c0-8305-11ee-b962-0242ac120002');
    });

    describe("Factory entity", () => {
        test("creating a simple factory entity", () => {
            const entity = new PixKey.Factory().make();
            expect(entity.toJSON()).toMatchObject({
                pixKey: {
                    kind: 3,
                    key: 'test@test.com',
                }
            });
        });

        test("creating a factory entity with data", () => {
            const entity = new PixKey.Factory()
                .withKind(2)
                .withKey('(19) 98870-4040')
                .make();

            expect(entity.toJSON()).toMatchObject({
                pixKey: {
                    kind: 2,
                    key: '19988704040',
                }
            });
        })
    })
})