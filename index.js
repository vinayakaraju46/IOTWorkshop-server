const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes.js')
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(routes);

app.listen(5000, () => {
    console.log("Server running in port: ", 5000);
})