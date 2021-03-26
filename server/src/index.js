const shortid = require('shortid')
var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

function serve() {
    require('./routes/index') (app);
    app.listen(3000, () => console.log('listening on port 3000'));
}

serve();