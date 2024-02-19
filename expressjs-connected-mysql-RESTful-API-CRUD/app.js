const express = require('express');
const mysql = require('mysql');

const app = express();

// Konfigurasi koneksi database MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'ujimysqlkudb',
  port: 3309,
  insecureAuth: true
});

// Membuat koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ', err);
  } else {
    console.log('Koneksi ke database berhasil');
  }
});

// Middleware untuk mengizinkan parsing body dari request
app.use(express.json());



// Route untuk mencari data berdasarkan filter
app.get('/data/filter', (req, res) => {
  const { filterField, filterValue } = req.query;

  // Query SELECT dengan filter
  const query = `SELECT * FROM users WHERE ${filterField} = ?`;
  connection.query(query, [filterValue], (error, results) => {
    if (error) {
      console.error('Error saat mencari data: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mencari data' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Data TIDAK ditemukan' });
      } else {
        res.json(results);
      }
    }
  });
});

// Route untuk melihat semua data
app.get('/data', (req, res) => {
  // Query SELECT untuk mengambil semua data dari tabel
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error saat mengambil data: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
    } else {
      res.json(results);
    }
  });
});

// Route untuk menambahkan data baru
app.post('/data', (req, res) => {
  const { id, nama, alamat } = req.body;

  // Query INSERT untuk menambahkan data ke tabel
  const query = `INSERT INTO users (id, nama, alamat) VALUES (?, ?, ?)`;
  connection.query(query, [id, nama, alamat], (error, results) => {
    if (error) {
      console.error('Error saat menambahkan data: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan data' });
    } else {
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    }
  });
});

// Route untuk melihat data berdasarkan ID
app.get('/data/:id', (req, res) => {
  const { id } = req.params;

  // Query SELECT untuk mengambil data berdasarkan ID dari tabel
  const query = 'SELECT * FROM users WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error saat mengambil data: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'Data tidak ditemukan' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

// Route untuk mengedit data berdasarkan ID
app.put('/data/:id', (req, res) => {
  const { id } = req.params;
  const { nama, alamat } = req.body;

  // Query UPDATE untuk mengedit data berdasarkan ID pada tabel
  const query = 'UPDATE users SET nama = ?, alamat = ? WHERE id = ?';
  connection.query(query, [nama, alamat, id], (error, results) => {
    if (error) {
      console.error('Error saat mengedit data: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengedit data' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Data tidak ditemukan' });
      } else {
        res.json({ message: 'Data berhasil diupdate' });
      }
    }
  });
});

// Route untuk menghapus data berdasarkan ID
app.delete('/data/:id', (req, res) => {
  const { id } = req.params;

  // Query DELETE untuk menghapus data berdasarkan ID pada tabel
  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [id], (error, results) => {
    if (error) {
      console.error('Error saat menghapus data: ', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat menghapus data' });
    } else {
      if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Data tidak ditemukan' });
      } else {
      res.json({ message: 'Data berhasil dihapus' });
      }
    }
  });
});


// Menjalankan server
app.listen(3000, () => {
console.log('Server berjalan pada port 3000');
});

