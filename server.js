const fs=require('fs');
const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data=fs.readFileSync('./database.json');
const conf=JSON.parse(data);
const mysql=require('mysql');

const connection=mysql.createConnection({
    host:conf.host,
    user:conf.user,
    password:conf.password,
    port:conf.port,
    database:conf.database
});
connection.connect();

const multer=require('multer');
const upload=multer({dest: './upload'});

app.get('/api/customers',(req,res)=>{
    connection.query(
       "SELECT * FROM CUSTOMER WHERE isDeleted=0",
       (err,rows,fiels)=>{
           res.send(rows);
       }
    );
        // res.send(
        //     [
        //         {
        //         'id': 1,
        //         'image':'https://placeimg.com/64/64/1',
        //         'name':'LimGokJong',
        //         'birthday':'132456',
        //         'gender':'man',
        //         'job':'Student'
        //         },
        //         {
        //         'id': 2,
        //         'image':'https://placeimg.com/64/64/2',
        //         'name':'LiSunSin',
        //         'birthday':'466213',
        //         'gender':'man',
        //         'job':'Programming'
        //         },
        //         {
        //         'id': 3,
        //         'image':'https://placeimg.com/64/64/3',
        //         'name':'HongGilDong',
        //         'birthday':'215434',
        //         'gender':'man',
        //         'job':'Designer'
        //         }
        //     ]

        // );
});

app.use('/image',express.static('./upload'));

app.post('/api/customers',upload.single('image'),(req,res)=>{
    let sql='INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?,now(),0)';
   // let image='/image/'+req.file.filename;
    let image='/image/'+req.file.filename;
    let name=req.body.name;
    let birthday=req.body.birthday;
    let gender=req.body.gender;
    let job=req.body.job;
    let params=[image, name, birthday, gender, job];
    connection.query(sql,params,
        (err, rows, fields)=>{
            res.send(rows);
        }
        );
});

app.delete('/api/customers/:id', (req,res)=>{
    let sql='UPDATE CUSTOMER SET isDeleted = 1 WHERE id=?';
    let params = [req.params.id];
    connection.query(sql,params,
        (err, rows, fields)=>{
            res.send(rows);
        })
})

app.listen(port,()=>console.log(`Listening on port ${port}`));
