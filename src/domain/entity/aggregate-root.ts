import EventDispatcher from "../event/@shared/event-dispatcher";
import EventHandlerInterface from "../event/@shared/event-handler.interface";
import EventInterface from "../event/@shared/event.interface";

export default abstract class AggregateRoot {
   
    private eventDispatcher: EventDispatcher;

    constructor() {
        this.eventDispatcher = new EventDispatcher();
    }

    protected registerEvent(eventName: string, eventHandler: EventHandlerInterface): void {
        this.eventDispatcher.register(eventName, eventHandler);
    }

    protected unregisterEvent(eventName: string, eventHandler: EventHandlerInterface): void {
        this.eventDispatcher.unregister(eventName, eventHandler);
    }

    protected unregisterAllEvents(): void {
        this.eventDispatcher.unregisterAll();
    }

    protected notifyEvents(event: EventInterface): void {
        this.eventDispatcher.notify(event);
    }
}