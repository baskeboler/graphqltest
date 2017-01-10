module.exports = class JobBooking {
    constructor({id, jobRequest, worker}) {
        this.id = id;
        this.jobRequest = jobRequest;
        this.worker = worker;
    }
}