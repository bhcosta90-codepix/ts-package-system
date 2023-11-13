import {EventInterface} from "../../@shared/domain/events/event.interface";

export interface EventManagerInterface {
    dispatch(events: EventInterface[]): void
}