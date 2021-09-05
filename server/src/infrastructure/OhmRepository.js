const {Ohm} = require("../domain/Ohm");

class OhmRepository {
    #dbStorage;

    constructor(storage) {
        this.#dbStorage = storage;
    }

    /**
     *
     * @param {Ohm} ohm
     * @returns {Promise<void>}
     */
    async save(ohm) {
        const ohmData = ohm.getData();

        await this.#dbStorage.save('ohms', ohmData.id, ohmData);
    }

    /**
     *
     * @param {string} id
     * @returns {Promise<Ohm|undefined>}
     */
    async fetch(id) {
        const ohmData = this.#dbStorage.fetch('ohms', id);

        return ohmData ? new Ohm(ohmData) : undefined;
    }
}

module.exports = { OhmRepository };