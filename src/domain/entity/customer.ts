import Address from "./address";

export default class Customer {
    
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
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
}