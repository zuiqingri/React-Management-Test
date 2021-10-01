const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send(
        [
            {
            'id': 1,
            'image':'https://placeimg.com/64/64/1',
            'name':'LimGokJong',
            'birthday':'132456',
            'gender':'man',
            'job':'Student'
            },
            {
            'id': 2,
            'image':'https://placeimg.com/64/64/2',
            'name':'LiSunSin',
            'birthday':'466213',
            'gender':'man',
            'job':'Programming'
            },
            {
            'id': 3,
            'image':'https://placeimg.com/64/64/3',
            'name':'HongGilDong',
            'birthday':'215434',
            'gender':'man',
            'job':'Designer'
            }
        ]

    );
});

app.listen(port,()=>console.log(`Listening on port ${port}`));
