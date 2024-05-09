import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {

    dataTimeEventOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeEventOccurred = new Date();
        this.eventData = eventData;
    }

}