"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pix_key_vo_1 = require("./pix-key.vo");
describe("PixKeyValueObject Unit Test", () => {
    test("Creating a new entity with id", () => {
        const value = 'd1904866-ae81-4ec2-9300-63a06b886d34';
        const entity = new pix_key_vo_1.PixKeyValueObject.ValueObject({
            kind: 1,
            key: value
        });
        expect(entity.key).not.toBeNull();
        expect(entity.key).not.toBe(value);
        expect(entity.kind).toBe(pix_key_vo_1.PixKeyValueObject.Kind.ID);
    });
    test("Creating a new entity with phone", () => {
        const value = '(19) 98870-7070';
        const entity = new pix_key_vo_1.PixKeyValueObject.ValueObject({
            kind: 2,
            key: value
        });
        expect(entity.key).toBe('19988707070');
        expect(entity.kind).toBe(pix_key_vo_1.PixKeyValueObject.Kind.PHONE);
    });
    test("Creating a new entity with document", () => {
        const value = '52.301.745/0001-94';
        const entity = new pix_key_vo_1.PixKeyValueObject.ValueObject({
            kind: 4,
            key: value
        });
        expect(entity.key).toBe("52301745000194");
        expect(entity.kind).toBe(pix_key_vo_1.PixKeyValueObject.Kind.DOCUMENT);
    });
    test("Creating a new entity with email", () => {
        const value = 'test@test.com';
        const entity = new pix_key_vo_1.PixKeyValueObject.ValueObject({
            kind: 3,
            key: value
        });
        expect(entity.key).toBe("test@test.com");
        expect(entity.kind).toBe(pix_key_vo_1.PixKeyValueObject.Kind.EMAIL);
    });
});
//# sourceMappingURL=pix-key.vo.spec.js.map