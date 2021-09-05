const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../db.config.json');

// I'll leave this file, but actually I don't need it to work at all :)

const db = (async () => {
    const _db = await low(adapter);
    await _db.defaults(config).write();
    return _db;
})();

async function getOhmById(id) {
    const _db = await db;
    const ohm = _db.get('ohms')
        .find({id})
        .value()

    return ohm;
}

module.exports = {getOhmById}