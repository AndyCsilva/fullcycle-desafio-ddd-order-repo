import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerModel from "./customer.model";
import CustomerRepository from "./costumer.repository";

describe("Customer Repository Test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
       const customer = new Customer("123", "John");
       const address = new Address("Street", 123, "City", "State", "Zip");
       customer.changeAddress(address);
       customer.activate();
       customer.addRewardPoints(10);

       const customerRepository = new CustomerRepository();
       await customerRepository.create(customer);

       const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
       expect(customerModel.toJSON()).toStrictEqual({
           id: customer.id,
           name: customer.name,
           active: customer.isActive,
           rewardPoints: customer.rewardPoints,
           street: customer.Address.street,
           number: customer.Address.number,
           city: customer.Address.city,
           state: customer.Address.state,
           zip: customer.Address.zip
       });

    });

    it("should update a customer", async () => {
        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "City", "State", "Zip");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardPoints(10);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        customer.changeName("Jane");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: customer.id } });
        
        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            active: customer.isActive,
            rewardPoints: customer.rewardPoints,
            street: customer.Address.street,
            number: customer.Address.number,
            city: customer.Address.city,
            state: customer.Address.state,
            zip: customer.Address.zip
        });

    });

    it("should find a customer", async () => {
        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "City", "State", "Zip");
        customer.changeAddress(address);
        customer.activate();
        customer.addRewardPoints(10);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find(customer.id);
        expect(customer).toStrictEqual(foundCustomer);
    });

    it("should throw error when not found customer", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("123");
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "John");
        const address = new Address("Street", 123, "City", "State", "Zip");
        customer.changeAddress(address);
        customer.addRewardPoints(10);
        customer.activate();

        await customerRepository.create(customer);
        
        const customer2 = new Customer("456", "Jane");
        const address2 = new Address("Street 2", 456, "City 2", "State 2", "Zip 2");
        customer2.changeAddress(address2);
        customer2.activate();
        customer2.addRewardPoints(20);
        
        await customerRepository.create(customer2);
        
        const foundCustomers = await customerRepository.findAll();

        expect(foundCustomers).toHaveLength(2);
        expect(foundCustomers).toContainEqual(customer);
        expect(foundCustomers).toContainEqual(customer2);
    });
        
})