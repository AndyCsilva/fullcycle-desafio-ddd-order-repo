import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address.changed.event";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleLogWhenCustomerAddressIsChangedHandler implements EventHandlerInterface<CustomerCreatedEvent> {
    
    handle(event: CustomerAddressChangedEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${JSON.stringify(event.eventData.address)}`);
    }
}