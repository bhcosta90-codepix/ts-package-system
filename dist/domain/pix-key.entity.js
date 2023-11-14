"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixKey = void 0;
const entity_abstract_1 = require("../@shared/domain/entity.abstract");
const pix_key_vo_1 = require("./vo/pix-key.vo");
var PixKey;
(function (PixKey) {
    class Entity extends entity_abstract_1.EntityAbstract {
        constructor(props) {
            super(props);
            this._pixKey = props.pixKey;
            this._bank = props.bank;
        }
        get kind() {
            return this._pixKey.kind;
        }
        get key() {
            return this._pixKey.key;
        }
        get bank() {
            return this._bank;
        }
    }
    PixKey.Entity = Entity;
    class Factory {
        constructor() {
            this._kind = 3;
            this._key = 'test@test.com';
        }
        withKind(value) {
            this._kind = value;
            return this;
        }
        withKey(value) {
            this._key = value;
            return this;
        }
        make() {
            return new PixKey.Entity({
                pixKey: new pix_key_vo_1.PixKeyValueObject.ValueObject({
                    kind: this._kind,
                    key: this._key
                }),
                bank: 'f7e2692c-8303-11ee-b962-0242ac120002'
            });
        }
    }
    PixKey.Factory = Factory;
})(PixKey || (exports.PixKey = PixKey = {}));
//# sourceMappingURL=pix-key.entity.js.map