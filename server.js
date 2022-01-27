const express = require('express');
const res = require('express/lib/response');
const { append } = require('express/lib/response');
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const db = knex({
    client: 'pg',
    connection: {
        // '127.0.0.1' is the same as localhost
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'test',
    database : 'smartbrain'
    }
});
//  (db.select('*').from('users').then(data =>{
//     console.log(data)
//  }));
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
const database = {
    users: [
        {
            id: '123',
            name: 'john',
            password: 'cookies',
            email: 'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            password: 'popcorn',
            email: 'sally@gmail.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:'987',
            hash: '',
            email:'john@gmail.com'
        }
    ]
}
app.get('/', (req, res)=>{
    res.send(database.users)
})
//signin
app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)})

//register

app.post('/register',(req, res)=> {register.handleRegister(req, res, db, bcrypt)})
//User profile
app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})
//Image
app.put('/image', (req, res) =>{image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) =>{image.handleApiCall(req, res, db)})



app.listen(3001, () =>{
    console.log('running on port 3001')
})


/*
/ -> res = this is working
/signin ---> POST = sucess or fail
/register --> POST = return new user object
/profile/:userId --> GET = user
/image --> PUT = user image count 
*/