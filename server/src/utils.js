const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../db.config.json');

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})()

async function getOhmById(id) {
    const _db = await db;
    const ohm = _db.get('ohms')
        .find({ trackingId: id })
        .value();
    return ohm;
}

async function updateOhm(id, content) {
  console.log(id, content);
  const _db = await db;
  return UpdateOhmComment(_db, id, content);;
}

function UpdateOhmComment(database, id, content){
  const ohm = database.get('ohms')
    .find({ trackingId: id })
    .set('comment', content)
    .write();
  return ohm;
}

module.exports = { getOhmById, updateOhm }