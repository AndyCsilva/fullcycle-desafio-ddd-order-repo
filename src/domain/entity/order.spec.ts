import Order from "./order"
import OrderItem from "./order_item"

describe('Order unit test', () => {

    it('should throw error when id is empty', () => {
        expect(() => new Order('', '123', [])).toThrow('Id is required')
    });

    it('should throw error when CostumerId is empty', () => {
        expect(() => new Order('123', '', [])).toThrow('CustomerId is required')
    });

    it('should throw error when items is empty', () => {
        expect(() => new Order('123', '123', [])).toThrow('Items are required')
    });

    it('should throw error when id is empty', () => {
        expect(() => new OrderItem('', 'Item 1', 100, "p1", 0))
            .toThrow('Id is required')
    });

    it('should throw error when productId is empty', () => {
        expect(() => new OrderItem('1', 'Item 1', 100, "", 0))
            .toThrow('ProductId is required')
    });

    it('should throw error when name is empty', () => {
        expect(() => new OrderItem('1', '', 100, "p1", 0))
            .toThrow('Name is required')
    });

    it('should throw error when price is less or equal zero', () => {
        expect(() => new OrderItem('1', 'Item 1', -1, "p1", 0))
            .toThrow('Price must be greater than 0')
    });

    it('should throw error when quantity is less or equal zero', () => {
        expect(() => new Order('123', '123', [new OrderItem('1', 'Item 1', 100, "p1", 0)]))
            .toThrow('Quantity must be greater than 0')
    });

    it('should calculate total', () => {
        const item = new OrderItem('1', 'Item 1', 100.02, "p1", 2);
        const item2 = new OrderItem('1', 'Item 2', 199.98, "p2", 1);

        expect(item.orderItemTotal()).toBe(200.04);
        expect(item2.orderItemTotal()).toBe(199.98);
        
        const order = new Order('123', '123', [item]);
        expect(order.total()).toBe(200.04);

        const order2 = new Order('123', '123', [item, item2]);
        expect(order2.total()).toBe(400.02);
    });

    it('should throw error when quantity is greater than zero', () => {
        expect(() => {
            const item = new OrderItem('1', 'Item 1', 100, "p1", 0);
            const order = new Order('123', '123', [item]);
        }).toThrow('Quantity must be greater than 0');
    })
})