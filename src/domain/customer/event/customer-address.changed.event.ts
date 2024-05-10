import EventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {

    dataTimeEventOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeEventOccurred = new Date();
        this.eventData = eventData;
    }

}