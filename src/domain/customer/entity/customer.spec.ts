import Address from "../value-object/address";
import Customer from "./customer"

describe('Customer unit test', () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            const costumer = new Customer('', 'André');
        }).toThrow('Id is required');
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            const costumer = new Customer('123', '');
        }).toThrow('Name is required');
    });

    it('should throw error when adress is empty', () => {
        expect(() => {
            const costumer = new Customer('123', 'André');
            costumer.changeAddress(undefined);
        }).toThrow('Address is required');
    });

    it('should change name', () => {
        //Arrange
        const costumer = new Customer('123', 'André');
        //Act
        costumer.changeName('Mayara');
        //Assert
        expect(costumer.name).toBe('Mayara');
    });

    it('should get 1 as result', () => {
        const costumer = new Customer('123', 'André');
        expect(costumer.id).toBe('123');
    });

    it('shouldn\'t activate customer', () => {
        expect(() => {
            const costumer = new Customer('123', 'André');
            costumer.activate();
        }).toThrow('Address is required');
    });

    it('should activate customer', () => {
        const costumer = new Customer('123', 'André');
        const address = new Address('Rua das flores', 123, 'São Paulo', 'SP', '12345-678');
        costumer.changeAddress(address);
        costumer.activate()
        expect(costumer.isActive).toBeTruthy();
    });

    it('should throw error when address is empty or undefined when you activate a customer', () => {
        expect(() => {
            const costumer = new Customer('123', 'André');
            costumer.activate();
        }).toThrow('Address is required');
    });

    it('should deactivate customer', () => {
        const costumer = new Customer('123', 'André');
        costumer.deactivate();
        expect(costumer.isActive).toBeFalsy();
    });

    it('should add rewards points', () => {
        const costumer = new Customer('123', 'André');
        costumer.addRewardPoints(1);
        expect(costumer.rewardPoints).toBe(1);

        costumer.addRewardPoints(10);
        expect(costumer.rewardPoints).toBe(11);

        costumer.addRewardPoints(100);
        expect(costumer.rewardPoints).toBe(111);

    });
    
    it('should throw error when add negative value in rewards points', () => {
        expect(() => {
            const costumer = new Customer('123', 'André');
            costumer.addRewardPoints(-2);
        }).toThrow('Points must be greater than zero');
    });

})