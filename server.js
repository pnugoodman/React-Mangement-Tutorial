const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,    
    user: conf.user,
    password: conf.password,    
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/hello', (req, res) =>{
    res.send({message: 'Hello Express!'});
});

app.get('/api/customers', (req, res) =>{
    connection.query(
        "select * from customer where isDeleted = 0",
        (err, rows, fileds) => {
            res.send(rows);
        }
    );
});

app.use('/image',express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res) => {
    let sql = 'insert into customer values (null, ?, ?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let sex = req.body.sex;
    let job = req.body.job;

    console.log(image);
    console.log(name);
    console.log(birthday);
    console.log(sex);
    console.log(job);


    let params = [image,name, birthday,sex,job];

    connection.query(sql,params,
        (err,rows, fields)=>{
            res.send(rows);
            console.log(err);
        }
    )
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE customer SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];

    connection.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error deleting customer:", err);
            res.status(500).send("Database error");
        } else {
            console.log(`Customer ID ${req.params.id} marked as deleted.`);
            res.send({ success: true, affectedRows: result.affectedRows });
        }
    });
});

app.listen(port,() => console.log(`Listening on port ${port}`));