const express = require('express');
const homeRoute = require('./routes/home');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000; 
const bodyParser = require('body-parser');
const path = require ('path');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;
db.on('error', () => console.log("Tidak bisa tersambung ke database"));
db.once('open',() => {
    console.log("Berhasil tersambung ke database");
});

app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'views'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(path.resolve(), 'public')));
app.use(bodyParser.json());

app.use('/', homeRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

