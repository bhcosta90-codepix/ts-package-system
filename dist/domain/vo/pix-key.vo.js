"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixKeyValueObject = void 0;
const crypto_1 = require("crypto");
var PixKeyValueObject;
(function (PixKeyValueObject) {
    let Kind;
    (function (Kind) {
        Kind[Kind["ID"] = 1] = "ID";
        Kind[Kind["PHONE"] = 2] = "PHONE";
        Kind[Kind["EMAIL"] = 3] = "EMAIL";
        Kind[Kind["DOCUMENT"] = 4] = "DOCUMENT";
    })(Kind = PixKeyValueObject.Kind || (PixKeyValueObject.Kind = {}));
    class ValueObject {
        constructor(props) {
            const mappingPixKeyKind = {
                "id": Kind.ID,
                "phone": Kind.PHONE,
                "email": Kind.EMAIL,
                "document": Kind.DOCUMENT,
            };
            this._kind = mappingPixKeyKind[props.kind];
            let value = props.key;
            if (this._kind === Kind.ID) {
                value = (0, crypto_1.randomUUID)();
            }
            switch (this._kind) {
                case Kind.PHONE:
                case Kind.DOCUMENT:
                    value = value.replace(/[^0-9]/g, '');
                    break;
            }
            this._key = value;
        }
        get kind() {
            return this._kind;
        }
        get key() {
            return this._key;
        }
    }
    PixKeyValueObject.ValueObject = ValueObject;
})(PixKeyValueObject || (exports.PixKeyValueObject = PixKeyValueObject = {}));
//# sourceMappingURL=pix-key.vo.js.map