const Joi = require("joi");

const ALLOWED_STATES = [
    'CREATED', 'PREPARING', 'READY', 'IN_DELIVERY', 'DELIVERED', 'REFUSED'
];
const STATE_TRANSITIONS = {
    undefined: [ "CREATED" ],
    "CREATED": ["PREPARING"],
    "PREPARING": ["READY"],
    "READY": ["IN_DELIVERY"],
    "IN_DELIVERY": ["DELIVERED", "REFUSED"],
    "DELIVERED": [],
    "REFUSED": []
};

class Ohm {
    #data;

    constructor(data) {
        this.#data = data;
    }

    setStatus(newStatus, reason) {
        const { status } = this.#data;
        const validStatus = Joi.attempt(
            newStatus,
            Joi.string()
                .required()
                .custom(value => {
                    if (!STATE_TRANSITIONS[status].includes(value)) {
                        throw new Error(
                            `You can't change status from '${status}' to '${value}'. Allowed options are: ${STATE_TRANSITIONS[status].join(', ')}`
                        );
                    }

                    return value;
                })
                .options({
                    abortEarly: true
                })
        );

        this.#data.status = validStatus;
        this.#addStatusToHistory(validStatus, reason);
    }

    #addStatusToHistory(state, reason) {
        if (!this.#data.history) {
            this.#data.history = [];
        }

        this.#data.history.push({
            state,
            at: String(Math.floor(new Date().getTime() / 1000)),
            ...(reason ? { reason } : {})
        });
    }

    setComment(comment) {
        this.#data.comment = String(comment);
    }

    getData() {
        return this.#data;
    }
}

module.exports = {
    Ohm,
    ALLOWED_STATES
}
