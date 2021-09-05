const FileAsync = require('lowdb/adapters/FileAsync');
const lowdb = require("lowdb");

class LowdbStorage {
    #db;

    constructor(
        dbInstance
    ) {
        this.#db = dbInstance;
    }

    static async create(filename, defaults) {
        const dbInstance = await lowdb(new FileAsync(filename));

        if (defaults !== undefined) {
            await dbInstance.defaults(defaults).write();
        }

        return new LowdbStorage(dbInstance);
    }

    async save(key, id, data) {
        await this.#db.get(key)
            .remove({ id })
            .write();

        await this.#db.get(key)
            .push(data)
            .write();
    }

    fetch(key, id) {
        return this.#db.get(key)
            .find({ id })
            .value();
    }
}

module.exports = { LowdbStorage };