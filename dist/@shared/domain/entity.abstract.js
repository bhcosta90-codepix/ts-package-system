"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityAbstract = void 0;
const crypto_1 = require("crypto");
const event_1 = require("./events/event");
class EntityAbstract {
    constructor(props) {
        var _a;
        this.props = props;
        this._event = new event_1.Event();
        this._id = (_a = this.props.id) !== null && _a !== void 0 ? _a : (0, crypto_1.randomUUID)();
        this._created_at = this.props.created_at
            ? new Date(this.props.created_at)
            : new Date();
        this._updated_at = this.props.updated_at
            ? new Date(this.props.updated_at)
            : new Date();
    }
    get id() {
        return this._id;
    }
    get created_at() {
        return this._created_at;
    }
    get updated_at() {
        return this._updated_at;
    }
    toJSON() {
        return Object.assign({ id: this.id.toString(), created_at: this.created_at, updated_at: this.updated_at }, this.props);
    }
    get event() {
        return this._event;
    }
    get events() {
        return this.event.events();
    }
}
exports.EntityAbstract = EntityAbstract;
//# sourceMappingURL=entity.abstract.js.map