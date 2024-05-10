import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order_item.model";
import CustomerRepository from "../../../customer/repository/sequelize/costumer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderRepository from "./order.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([
            CustomerModel,
            OrderModel,
            OrderItemModel,
            ProductModel,
        ]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "State 1", "Zip 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("Should update an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "State 1", "Zip 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        
        const orderRepository = new OrderRepository();
        const order = new Order('o1', customer.id, [orderItem]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: order.id,
                    product_id: product.id,
                },
            ]
        });

        const product2 = new Product("456", "Product 2", 3);
        await productRepository.create(product2);
        
        const orderItem2 = new OrderItem("oi2", product2.name, product2.price, product2.id, 1);
        
        const orderUpdate = new Order(order.id, customer.id, [orderItem, orderItem2]);
        await orderRepository.update(orderUpdate);
        
        const orderModelUpdated = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });
        
        expect(orderModelUpdated.toJSON()).toStrictEqual({
            id: orderUpdate.id,
            customer_id: customer.id,
            total: orderUpdate.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: orderUpdate.id,
                    product_id: product.id,
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    order_id: orderUpdate.id,
                    product_id: product2.id,
                },
            ]
        });
    });

    it("Should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "State 1", "Zip 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        
        const orderRepository = new OrderRepository();
        const order = new Order('o1', customer.id, [orderItem]);
        await orderRepository.create(order);

       const foundOrder = await orderRepository.find(order.id);
       expect(foundOrder).toStrictEqual(order);
    });

    it("Should find an order with details from items and customer and address an product", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "State 1", "Zip 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        
        const orderRepository = new OrderRepository();
        const order = new Order('o1', customer.id, [orderItem]);
        await orderRepository.create(order);

        const foundOrder = await OrderModel.findOne({ where: { id: order.id }, include: ["items", "customer"], rejectOnEmpty: true });
        const itemsDetailed = await OrderItemModel.findAll({ where: { order_id: foundOrder.id }, include: ["product", "order"] });
        const item = itemsDetailed[0];

        expect(item.toJSON()).toStrictEqual({
            id: orderItem.id,
            name: orderItem.name,
            price: orderItem.price,
            quantity: orderItem.quantity,
            order_id: order.id,
            order: {
                id: order.id,
                customer_id: customer.id,
                total: order.total()
            },
            product_id: product.id,
            product: {
                id: product.id,
                name: product.name,
                price: product.price
            }
        })
       
    });

    it("should'n find an order", async () => {
        const orderRepository = new OrderRepository();
        expect(async () => {
            await orderRepository.find("123");
        }).rejects.toThrow("Order not found");
    });

    it("Should find all orders", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "State 1", "Zip 1");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem("oi1", product.name, product.price, product.id, 2);
        
        const orderRepository = new OrderRepository();
        const order = new Order('o1', customer.id, [orderItem]);
        await orderRepository.create(order);

        //order II
        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address("Street 2", 12, "City 2", "State 2", "Zip 2");
        customer2.changeAddress(address2);
        customer2.activate();
        await customerRepository.create(customer2);

        const product2 = new Product("456", "Product 2", 3);
        await productRepository.create(product2);
        
        const orderItem2 = new OrderItem("oi2", product2.name, product2.price, product2.id, 3);
        
        const order2 = new Order('o2', customer.id, [orderItem2]);
        await orderRepository.create(order2);

       const foundOrders = await orderRepository.findAll();
       expect(foundOrders).toStrictEqual([order, order2]);
    });
}) 