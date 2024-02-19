# nodejs sederhana dengan framework expressjs #

---


instalasi expressjs:

    > npm install express



pastikan sebelumnya telah menginstall paket diperlukan yaitu :

- mysql

    - cara install

        $ npm install mysql

    - tampilkan list paket
    
        $ npm list
  
            ├── express@4.18.0
        
            └── mysql@2.18.1



periksa file json dan buat file js secara manual serta isinya.

- package.json

- app.js



jalankan (command) :

    > node app.js
        op:
        Server running on port 3000




---


desclimer:

saat menjalankan pertama kali pada container mysql maka akan terdapat error sebagai berikut:

    ❯ node app.js


Server berjalan pada port 3000
Koneksi ke database gagal:  Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

untuk mengatasi hal tersebut lakukan langkah berikut:


    ❯ mysql -h 127.0.0.1 -P 3309 -u root -p --ssl-mode=DISABLED
        mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
        Query OK, 0 rows affected (0.03 sec)



        mysql> use ujimysqlkudb;
        
        mysql> select * from users;
        
        +------+---------+--------+
        
        | id   | nama    | alamat |
        
        +------+---------+--------+
        
        |    1 | andara  | jaksel |
        
        |    2 | sukiman | bekasi |
        
        +------+---------+--------+
        
        2 rows in set (0.00 sec)

---


### Contoh ini mencakup beberapa rute:
    1. Rute GET `/data` untuk melihat semua data dari tabel.

    2. Rute POST `/data` untuk menambahkan data baru ke tabel.

    3. Rute GET `/data/:id` untuk melihat data berdasarkan ID.

    4. Rute PUT `/data/:id` untuk mengedit data berdasarkan ID.

    5. Rute DELETE `/data/:id` untuk menghapus data berdasarkan ID.

    6. Rute GET `/data/filter` untuk mencari data berdasarkan filter menggunakan query string.



lanjut coba jalankan kembali aplikasi:

    ❯ node app.js


Server berjalan pada port 3000, terhubung ke database MySQL




eksekusi dengan CURL:

    1. Rute GET `/data` untuk melihat semua data dari tabel.

            ❯ curl -X GET http://localhost:3000/data

                output :
                [{"id":1,"nama":"andara","alamat":"jaksel"},{"id":2,"nama":"sukiman","alamat":"bekasi"},{"id":3,"nama":"makaela","alamat":"bekasi"},{"id":4,"nama":"abdurrahman","alamat":"tangerang"}]

---

    2. Rute POST `/data` untuk menambahkan data baru ke tabel.

            ❯ curl -X POST -H "Content-Type: application/json" -d '{"id": 5, "nama": "muhammad", "alamat": "jakarta barat"}' http://localhost:3000/data

                output :
                {"message":"Data berhasil ditambahkan"}




3. Rute GET `/data/:id` untuk melihat data berdasarkan ID.
❯ curl -X GET http://localhost:3000/data/1

output :
{"id":1,"nama":"andara","alamat":"jaksel"}

Rute PUT `/data/:id` untuk mengedit data berdasarkan ID.




4. Rute PUT `/data/:id` untuk mengedit data berdasarkan ID.
❯ curl -X PUT -H "Content-Type: application/json" -d '{"nama": "stevani", "alamat": "vancouver"}' http://localhost:3000/data/5

output :
{"message":"Data berhasil diupdate"}



5. Rute DELETE `/data/:id` untuk menghapus data berdasarkan ID.
❯ curl -X DELETE http://localhost:3000/data/5

output :
{"message":"Data berhasil dihapus"}



6. Rute GET `/data/filter` untuk mencari data berdasarkan filter menggunakan query string.
❯ curl -X GET 'http://localhost:3000/data/filter?filterField=nama&filterValue=makaela'

output :
[{"id":3,"nama":"makaela","alamat":"bekasi"}]%  




# check data
❯ mysql -h 127.0.0.1 -P 3309 -u root -p --ssl-mode=DISABLED
Enter password: password
mysql> use ujimysqlkudb;
mysql> select * from users;
+------+-------------+-----------+
| id   | nama        | alamat    |
+------+-------------+-----------+
|    1 | andara      | jaksel    |
|    2 | sukiman     | bekasi    |
|    3 | makaela     | bekasi    |
|    4 | abdurrahman | tangerang |
+------+-------------+-----------+
4 rows in set (0.00 sec)

