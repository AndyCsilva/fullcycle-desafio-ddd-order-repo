import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            city: entity.Address.city,
            state: entity.Address.state,
            zip: entity.Address.zip
        })
        entity.notifyThatCostumerWasCreated();
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
            street: entity.Address.street,
            number: entity.Address.number,
            city: entity.Address.city,
            state: entity.Address.state,
            zip: entity.Address.zip
        }, {
            where: {
                id: entity.id
            }
        });
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne(
                {
                    where: {
                        id
                    },
                    rejectOnEmpty: true,
                });
        } catch (error) {
            throw new Error("Customer not found");
        }
        const customer = new Customer(customerModel.id, customerModel.name);
        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.city,
            customerModel.state,
            customerModel.zip);
        customer.changeAddress(address);
        customer.addRewardPoints(customerModel.rewardPoints);
        customer.activate();
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const costumers = await CustomerModel.findAll();
        return costumers.map(customerModel => {
            const customer = new Customer(customerModel.id, customerModel.name);
            const address = new Address(
                customerModel.street,
                customerModel.number,
                customerModel.city,
                customerModel.state,
                customerModel.zip);
            customer.changeAddress(address);
            customer.addRewardPoints(customerModel.rewardPoints);
            if (customerModel.active) {
                customer.activate();
            }
            return customer;
        });
    }
}