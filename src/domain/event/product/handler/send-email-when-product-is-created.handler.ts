import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler 
    implements EventHandlerInterface<ProductCreatedEvent> {

    handle(event: ProductCreatedEvent): void {
        console.log(
            `sending an email to inform that the product ${JSON.stringify(event.eventData)} was created at ${event.dataTimeEventOccurred.toISOString()}`
        );
    }
}