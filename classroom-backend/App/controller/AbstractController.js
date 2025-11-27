class AbstractController {
    constructor(service) {
        this.service = service;
    }
    jsonResponse(res, data, status = 200) {
        res.status(status).json(data);
    }
}

module.exports = AbstractController;
