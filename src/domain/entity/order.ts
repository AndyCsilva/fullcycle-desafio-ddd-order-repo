import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;//se está em diferentes agregados, a relação é por ID
    private _items: OrderItem[] = [];//se está dentro do mesmo agregado, a relação é pelo mesmo objeto/classe
    private _total: number = 0;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();

        this.validate();
    }

    get id(): string {
        return this._id;
    }
    get customerId(): string {
        return this._customerId;
    }
    get items(): OrderItem[] {
        return this._items;
    }

    total(): number {
        return this._items
            .reduce((total, item) => total + item.orderItemTotal(), 0);
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
        if (this._customerId.length === 0) {
            throw new Error('CustomerId is required');
        }
        if (this._items.length === 0) {
            throw new Error('Items are required');
        }
        if (this._items.some(item => item.quantity <= 0)) {
            throw new Error('Quantity must be greater than 0');
        }
        return true;
    }
}  