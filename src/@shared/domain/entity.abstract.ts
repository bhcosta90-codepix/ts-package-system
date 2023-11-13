import {EntityInterface} from "./entity.interface";
import {randomUUID} from 'crypto'

export abstract class EntityAbstract<PropsConstructor = any> implements EntityInterface<PropsConstructor> {
    protected _id: string;
    protected _created_at: Date;
    protected _updated_at: Date;

    protected constructor(protected readonly props: PropsConstructor & EntityProps) {
        this._id = this.props.id ?? randomUUID();
        this._created_at = new Date(this.props.created_at);
        this._updated_at = new Date(this.props.updated_at);
    }

    get id(): string {
        return this._id;
    }

    get created_at(): Date {
        return this._created_at
    }

    get updated_at(): Date {
        return this._updated_at
    }

    toJSON(): Required<{ id: string, created_at: string, updated_at: string } & PropsConstructor> {
        return {
            id: this.id.toString(),
            ...this.props
        } as Required<{ id: string, created_at: string, updated_at: string } & PropsConstructor>
    }

}

export type EntityProps = {
    id?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};