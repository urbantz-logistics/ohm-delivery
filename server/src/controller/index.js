const Utils = require('../utils');

const getOhmsByTrackingId = async (req, res) => {
    try {
        const ohm = await Utils.getOhmById(req.params.id);
        return res
        .status(ohm.status)
        .send({
            data: ohm.data,
            status: ohm.status,
            message: ohm.message
        }); 

    } catch(error) {
        return res
        .status(400)
        .send({
            data: null,
            status: 400,
            message: error.message
        })
    }
};

const updateOhmsStatus = async (req, res) => {
    try {
        let status = req.body.status;
        let comment = req.body.comment;
        if(!status) {
            return res
            .status(400)
            .send({
                data: null,
                status: 400,
                message: "Status required"
            });
        }
        if(status === 'REFUSED' && !comment) {
            return res
            .status(400)
            .send({
                data: null,
                status: 400,
                message: "Comment is required"
            });
        }
        const ohm = await Utils.updateOhmStatus(req.params.id, status, comment);
        return res
        .status(ohm.status)
        .send({
            data: ohm.data,
            status: ohm.status,
            message: ohm.message
        }); 

    } catch(error) {
        return res
        .status(400)
        .send({
            data: null,
            status: 400,
            message: error.message
        })
    }
};

module.exports = {
    getOhmsByTrackingId,
    updateOhmsStatus
};

