import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("John Doe");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.constructor.name).toBe("Customer");
    });

    it("shoul create a customer with address", () => {
        const address = new Address("Street 1", 1, "12345-678", "São Paulo", "SP");
        const customer = CustomerFactory.createWithAddress("John Doe", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBe(address);
        expect(customer.constructor.name).toBe("Customer");
    });
})