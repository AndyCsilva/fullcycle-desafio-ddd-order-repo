import CustomerAddressChangedEvent from "../event/customer/customer-address.changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import EnviaConsoleLog1WhenCustomerIsCreatedHandler from "../event/customer/handler/envia-console-log-1-when-customer-is-created.handler";
import EnviaConsoleLog2WhenCustomerIsCreatedHandler from "../event/customer/handler/envia-console-log-2-when-customer-is-created.handler";
import EnviaConsoleLogWhenCustomerAddressIsChangedHandler from "../event/customer/handler/envia-console-log-when-customer-address-is-changed";
import Address from "./address";
import AggregateRoot from "./aggregate-root";

export default class Customer extends AggregateRoot {
    
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get isActive(): boolean {
        return this._active;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
    }

    changeName(name: string) {
        if (name === undefined || name.length === 0) {
            throw new Error('Name is required');
        }
        this._name = name;
    }

    changeAddress(address: Address) {
        if (address === undefined) {
            throw new Error('Address is required');
        }
        this._address = address;
        this.notifyThatCostumerAddressWasChanged();
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Address is required');
        }
        this._active = true;
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
    }

    deactivate() {
        this._active = false;
    }

    addRewardPoints(points: number) {
        if (points <= 0) {
            throw new Error('Points must be greater than zero');
        }
        this._rewardPoints += points;
    }

    notifyThatCostumerWasCreated() {
        this.registerEvent("CustomerCreatedEvent", new EnviaConsoleLog1WhenCustomerIsCreatedHandler());
        this.registerEvent("CustomerCreatedEvent", new EnviaConsoleLog2WhenCustomerIsCreatedHandler());

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: this.id,
            name: this.name,
        });

        this.notifyEvents(customerCreatedEvent);
    }

    notifyThatCostumerAddressWasChanged() {
        this.registerEvent("CustomerAddressChangedEvent", new EnviaConsoleLogWhenCustomerAddressIsChangedHandler());

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            street: this._address.street,
            number: this._address.number,
            city: this._address.city,
            state: this._address.state,
            zip: this._address.zip
        });

        this.notifyEvents(customerAddressChangedEvent);
    }
}