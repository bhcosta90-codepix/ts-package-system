import { EntityInterface } from "./entity.interface";
import { Event } from "./events/event";
import { EventInterface } from "./events/event.interface";
export declare abstract class EntityAbstract<PropsConstructor = any> implements EntityInterface<PropsConstructor> {
    protected readonly props: PropsConstructor & EntityProps;
    protected _id: string;
    protected _created_at: Date;
    protected _updated_at: Date;
    private _event;
    protected constructor(props: PropsConstructor & EntityProps);
    get id(): string;
    get created_at(): Date;
    get updated_at(): Date;
    toJSON(): Required<{
        id: string;
        created_at: string;
        updated_at: string;
    } & PropsConstructor>;
    protected get event(): Event;
    get events(): EventInterface[];
}
export type EntityProps = {
    id?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
};
//# sourceMappingURL=entity.abstract.d.ts.map