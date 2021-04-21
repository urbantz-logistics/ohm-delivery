const shortid = require('shortid')
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
const { getOhmById, updateOhm } = require('./utils');
app.use(bodyParser.json());

app.get('/ohms/:id', async (req, res) => {
    const ohm = await getOhmById(req.params.id)
        .then(data => {
            delete data.id;
            res.send(data);
        },
        error => {
            console.log("An error has ocurred")
            res.send(error);
        })
})

app.post('/ohms/:id', async (req, res) => {
    try {
        updateOhm(req.params.id, req.body);
    }
    catch{
        res.send("Failure to update")
    }
})

app.listen(3000, () => console.log('listening on port 3000'));