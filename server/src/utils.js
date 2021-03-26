const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../db.config.json');

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})()

async function getOhmById(trackingId) {
    const _db = await db;
    const ohm = _db.get('ohms')
        .find({ trackingId })
        .value()
    if(!ohm) {
      return {status: 400, data: null, message: "Ohm not found"};
    }
    return {status: 200, data: ohm,  message: "Ohm retrieved"};
}

async function updateOhmStatus(id, status, comment) {
  const _db = await db;
  const ohm = _db.get('ohms')
      .find({ id })
      .value()
  if(!ohm) {
    return {
      status: 400,
      data: null,
      message: "Ohm not found"
    };
  }
  const statusHistory = ohm.history || [];
  let lastHistory = statusHistory[statusHistory.length - 1];
  let lastStatus = '';
  if(lastHistory) {
    lastStatus = lastHistory.state;
  }

  let updateStatus = status.toUpperCase();
  const errorMessage = {
    status: 400,
    data: null,
    message: `Status cannot be updated to ${updateStatus}`
  };

  switch(updateStatus) {
    case 'PREPARING':
      if(lastStatus !== 'CREATED') {
        return errorMessage;
      }
      break;
    case 'READY':
      if(lastStatus !== 'PREPARING') {
        return errorMessage;
      }
      break;
    case 'IN_DELIVERY':
      if(lastStatus !== 'READY') {
        return errorMessage;
      }
      break;
    case 'DELIVERED': case 'REFUSED':
      if(lastStatus !== 'IN_DELIVERY') {
        return errorMessage;
      }
      break;
    default:
      return {
        status: 400,
        data: null,
        message: `Invalid Status`
      }
  }

  const newStatus = {
    'state': 'PREPARING',
    'at': Date.parse(new Date)
  };
  statusHistory.push(newStatus);
  let updateData = {
    history: statusHistory,
  }
  if(updateStatus === 'REFUSED') {
    updateData['comment'] = comment
  }

  const newOhm = db.get('ohms')
    .nth(id)
    .assign(updateData)
    .value();
  db.write();

  if(!newOhm) {
    return {status: 400, data: null, message: "Unable to update ohm"};
  }
  return {status: 200, data: newOhm,  message: "Ohm updated"};
 
}

module.exports = {
  getOhmById,
  updateOhmStatus
};