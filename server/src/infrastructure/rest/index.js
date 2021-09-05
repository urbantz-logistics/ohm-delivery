const express = require('express');
const bodyParser = require('body-parser');
const Joi = require("joi");
const { ALLOWED_STATES } = require("../../domain/Ohm")

/**
 *
 * @param {OhmRepository} ohmRepository
 */
function serve(ohmRepository, port = 3000) {
    const app = express();
    app.use(bodyParser.json())

    app.get('/ohms/:id', async (req, res) => {
        const ohm = await ohmRepository.fetch(req.params.id);

        if (ohm) {
            res.send(ohm.getData());
        } else {
            res.status(404);
            res.send({ reason: "OHM_NOT_FOUND" });
        }
    });

    app.patch('/ohms/:id', async (req, res) => {
        const ohm = await ohmRepository.fetch(req.params.id);

        try {
            if (ohm === undefined) {
                res.status(404);
                res.send({
                    reason: "OHM_NOT_FOUND"
                });
                return;
            }

            const { status, reason } = Joi.attempt(req.body, Joi.object({
                status: Joi.string().valid(...ALLOWED_STATES),
                reason: Joi.when(
                    "status", {
                        is: "REFUSED",
                        then: Joi.string(),
                        otherwise: Joi.forbidden()
                    }
                )

            }, {stripUnknown: true}));

            ohm.setStatus(status, reason);

            await ohmRepository.save(ohm);

            //
            res.status(204);
            res.send();
        } catch (err) {
            if (err.isJoi) {
                res.status(400);
            } else {
                res.status(500);
            }

            res.send({
                reason: err.message
            });
        }
    });

    app.put('/ohms/:id/comment', async (req, res) => {
        const ohm = await ohmRepository.fetch(req.params.id);

        try {
            if (ohm === undefined) {
                res.status(404);
                res.send({
                    reason: "OHM_NOT_FOUND"
                });
                return;
            }

            const { comment } = Joi.attempt(req.body, Joi.object({
                comment: Joi.string().required()
            }, {stripUnknown: true}));

            ohm.setComment(comment);

            await ohmRepository.save(ohm);

            //
            res.status(204);
            res.send();
        } catch (err) {
            if (err.isJoi) {
                res.status(400);
            } else {
                res.status(500);
            }

            res.send({
                reason: err.message
            });
        }
    });

    app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = { serve };