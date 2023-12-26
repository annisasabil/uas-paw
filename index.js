const express = require('express');
const homeRoute = require('./routes/home');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const uri = 'mongodb://127.0.0.1:27017/uas';
const bodyParser = require('body-parser');

mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', () => console.log("Tidak bisa tersambung ke database"));
db.once('open',() => {
    console.log("Berhasil tersambung ke database");
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/', homeRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

