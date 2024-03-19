import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let costumer = new Customer('123', 'André');
const address = new Address('Rua das flores', 123, 'São Paulo', 'SP', '12345-678');
costumer.changeAddress(address);
costumer.activate();
// Relação entre o agregado de Costumer e Order é de ID

// Relação entre o agregado de Order e Item é de Objeto/Entidade
const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 2);
const item2 = new OrderItem('2', 'Item 2', 20,'p2', 3);
const order = new Order('123', '123', [item1, item2]);