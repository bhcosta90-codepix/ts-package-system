"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_abstract_1 = require("../../@shared/domain/entity.abstract");
const pix_key_entity_1 = require("../pix-key.entity");
const pix_key_vo_1 = require("../vo/pix-key.vo");
describe("PixKey.Entity Unit Test", () => {
    test("Creating a new entity with id", () => {
        const value = 'd1904866-ae81-4ec2-9300-63a06b886d34';
        const entity = new pix_key_entity_1.PixKey.Entity({
            pixKey: new pix_key_vo_1.PixKeyValueObject.ValueObject({
                kind: "id",
                key: value
            }),
            bank: '8ee0a7c0-8305-11ee-b962-0242ac120002'
        });
        expect(entity.key).not.toBeNull();
        expect(entity.key).not.toBe(value);
        expect(entity.kind).toBe(pix_key_vo_1.PixKeyValueObject.Kind.ID);
        expect(entity).toBeInstanceOf(entity_abstract_1.EntityAbstract);
        expect(entity.bank).toBe('8ee0a7c0-8305-11ee-b962-0242ac120002');
    });
    describe("Factory entity", () => {
        test("creating a simple factory entity", () => {
            const entity = new pix_key_entity_1.PixKey.Factory().make();
            expect(entity.toJSON()).toMatchObject({
                pixKey: {
                    kind: 3,
                    key: 'test@test.com',
                }
            });
        });
        test("creating a factory entity with data", () => {
            const entity = new pix_key_entity_1.PixKey.Factory()
                .withKind("phone")
                .withKey('(19) 98870-4040')
                .make();
            expect(entity.toJSON()).toMatchObject({
                pixKey: {
                    kind: 2,
                    key: '19988704040',
                }
            });
        });
    });
});
//# sourceMappingURL=pix-key.entity.spec.js.map