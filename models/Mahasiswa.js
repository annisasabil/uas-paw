const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MahasiswaSchema = new Schema({
    nama:{
        type: String,
        required: true
    },
    nim:{
        type: String,
        required: true
    },
    jurusan:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    nomorHp:{
        type: String,
        required: true
    },
    asal:{
        type: String,
        required: true
    },
    jenisKelamin:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('mahasiswa', MahasiswaSchema);