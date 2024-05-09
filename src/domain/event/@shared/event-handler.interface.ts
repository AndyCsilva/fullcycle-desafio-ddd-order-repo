import EventInterface from "../@shared/event.interface";

export default interface EventHandlerInterface<T extends EventInterface=EventInterface> {
    handle(event: T): void;
}