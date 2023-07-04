const  express = require('express');
const app = express();
app.use(express.json());
const port = process.env.port || 4000;
require('dotenv').config({path:'./.env'});
const connect = require('./db/conn');
connect();





app.listen(port, ()=>{
    console.log(`listening to the ${port}`)
})