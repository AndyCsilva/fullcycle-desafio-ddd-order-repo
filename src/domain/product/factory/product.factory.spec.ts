import ProductFactory from "./product.factory";

describe("Product factory unit test", () => {
    it("should create a product a", () => {
        const product = ProductFactory.create("a", "Product A", 10.9);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(10.9);
        expect(product.constructor.name).toBe("Product");
    });

    it("should create a product b", () => {
        const product = ProductFactory.create("b", "Product B", 8.9);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(17.8);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw error when type is invalid", () => {
        expect(() => {
            ProductFactory.create("c", "Product C", 8.9);
        }).toThrow("Product type not supported");
    });
})