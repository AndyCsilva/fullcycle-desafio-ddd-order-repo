import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
 
    private eventHandlers: Record<string, EventHandlerInterface[]> = {}

    get getEventHandlers(): Record<string, EventHandlerInterface[]> {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        this.eventHandlers[eventName] = [...(this.eventHandlers[eventName] || []), eventHandler];
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        const index = this.eventHandlers[eventName].indexOf(eventHandler);
        if (index >= 0) {
            this.eventHandlers[eventName].splice(index, 1);
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    notify(event: EventInterface): void {
        this.eventHandlers[event.constructor.name]?.
            forEach((eventHandler) => eventHandler.handle(event));

        this.unregisterAll();
    }
}