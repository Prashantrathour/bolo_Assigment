const express = require('express');
const { connection } = require('./db');
const app = express();
const env=require("dotenv")
const cors = require('cors')
env.config()
const formcontroll=require("./routes/formsController.js")
const response=require("./routes/responsesController.js")

app.use(cors())
app.use(express.json())

app.use('/form',formcontroll)
app.use('/response',response)

app.use('/',(req,res)=>{
    res.send('API working "WELLCOME BOLOFORM"')
})

app.listen(process.env.LOCALHOST,async ()=>{
    console.log('server started',process.env.LOCALHOST);
    try {
        connection
        console.log('database connection done')
    } catch (error) {
        console.log('error while connecting database '+process.env.LOCALHOST,error);
    }
})