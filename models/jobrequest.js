module.exports = class JobRequest {
    constructor({id, house, date, numberOfHours, open}) {
        this.id = id;
        this.house = house;
        this.date = date || new Date();
        this.numberOfHours = numberOfHours || 3;
        this.open = open;
    }
}