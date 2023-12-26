const express = require('express');
const router = express.Router();
const Mahasiswa = require('../models/Mahasiswa');

router.get('/', async (req, res, next) => {
    try {
        const mahasiswas = await Mahasiswa.find();
        res.render('home', { mahasiswas });
    } catch (err) {
        console.log("Tidak bisa mengambil data:", err);
        res.status(500).send("Terjadi kesalahan saat mengambil data dari database");
    }
});

router.post('/add', async (req, res, next) => {
    try {
        const { nama, nim, jurusan, email, nomorHp, asal, jenisKelamin } = req.body;

        console.log(nama, nim, jurusan, email, nomorHp, asal, jenisKelamin);

        const uclMahasiswa = new Mahasiswa({
            nama,
            nim,
            jurusan,
            email,
            nomorHp,
            asal,
            jenisKelamin
        });

        await uclMahasiswa.save();
        console.log("Data berhasil disimpan ke database");
        res.redirect('/');
    } catch (err) {
        console.error("Tidak dapat menyimpan data ke database:", err);
        res.status(500).send("Terjadi kesalahan saat menyimpan data ke database");
    }
});

// update

router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id.replace(/[^\da-fA-F]/g, ''); // Remove non-hex characters
        console.log(id);
        const docs = await Mahasiswa.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );

        if (!docs) {
            console.log("Tidak bisa edit data");
            res.status(404).send("Data not found");
        } else {
            res.render('edit', { Mahasiswa: docs });
        }
    } catch (err) {
        console.error("Error editing data:", err);
        res.status(500).send("Error editing data");
    }
});

router.post('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id.replace(/[^\da-fA-F]/g, ''); // Remove non-hex characters
        const updatedData = req.body;

        const docs = await Mahasiswa.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!docs) {
            console.log("Data not found");
            res.status(404).send("Data not found");
        } else {
            console.log("Data berhasil diupdate");
            res.redirect('/');
        }
    } catch (err) {
        console.error("Error updating data:", err);
        res.status(500).send("Error updating data");
    }
});

// delete
router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id.replace(/[^\da-fA-F]/g, ''); // Remove non-hex characters

        const deletedMahasiswa = await Mahasiswa.findByIdAndDelete(id);

        if (!deletedMahasiswa) {
            console.log("Data not found");
            res.status(404).send("Data not found");
        } else {
            console.log("Berhasil Menghapus");
            res.redirect('/');
        }
    } catch (err) {
        console.error("Error deleting data:", err);
        res.status(500).send("Error deleting data");
    }
});

module.exports = router;

