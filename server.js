const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/hello', (req, res) =>{
    res.send({message: 'Hello Express!'});
});

app.get('/api/customers', (req, res) =>{
    res.send([
        {
            'id':'1',
            'image': 'https://picsum.photos/64/1',
            'name':'홍길동', 
            'birthday':'01030012266',
            'sex':'남자',
            'job':'대학생',
        },
        {
            'id':'2',
            'image': 'https://picsum.photos/64/2',
            'name':'김나리', 
            'birthday':'01030012267',
            'sex':'여자',
            'job':'직장',
        },
        {
            'id':'1',
            'image': 'https://picsum.photos/64/3',
            'name':'이기리', 
            'birthday':'01030012268',
            'sex':'남자',
            'job':'군인',
        }
    ]);
});


app.listen(port,() => console.log(`Listening on port ${port}`));