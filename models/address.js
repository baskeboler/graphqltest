
module.exports = class Address {
    constructor({streetA, streetB, city, country, state, zip}) {
        this.streetA = streetA;
        this.streetB = streetB;
        this.city = city;
        this.country = country;
        this.state = state;
        this.zip = zip;
    }
}