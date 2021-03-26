const { getOhmsByTrackingId, updateOhmsStatus } = require('../controller/index');

module.exports = function (app) {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.get('/ohms/:id', getOhmsByTrackingId);
    app.post('/ohms/update-status/:id', updateOhmsStatus);
};