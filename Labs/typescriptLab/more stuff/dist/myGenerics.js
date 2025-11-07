"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const score = [];
const name = [];
function identityOne(val) {
    return val;
}
function identityTwo(val) {
    return val;
}
function identityThree(val) {
    return val;
}
// identityThree(true)
function identityFour(val) {
    return val;
}
// identityFour<Bottle>({})
function getSearchProducts(products) {
    const myIndex = 3;
    return products[3];
}
const getMoreSearchProducts = (products) => {
    const Index = 4;
    return products[Index];
};
function anotherFunction(valOne, valTwo) {
    return {
        valOne,
        valTwo
    };
}
class Sellable {
    cart = [];
    addToCart(product) {
        this.cart.push(product);
    }
}
//# sourceMappingURL=myGenerics.js.map