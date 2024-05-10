import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe('Order service unit test', () => {

    it('should place an order', () => {
        const costumer = new Customer('c1', 'Anderson');
        const item1 = new OrderItem('i1', 'Minoxidil 500mg', 29.90, 'min500', 2);
        const item2 = new OrderItem('i2', 'Desodorante Axe 400ml', 12.00, 'axe400', 1);
        const order = OrderService.placeOrder(costumer, [item1, item2]);

        expect(costumer.rewardPoints).toBe(35.90);
        expect(order.total()).toBe(71.80);
    });
    
    it('shoult get total of orders', () => {
        const orderItem1 = new OrderItem('i1', 'Item 1', 100, 'p1', 1);
        const orderItem2 = new OrderItem('i2', 'Item 2', 200, 'p2', 2);

        const order1 = new Order('o1', 'c1', [orderItem1]);
        const order2 = new Order('o1', 'c2', [orderItem2]);

        const  total = OrderService.total([order1, order2]);
        expect(total).toBe(500);
    });
});