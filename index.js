const app = require('./app')
const db = require('./Config/db')
const userModel = require('./model/user.model')
const port = 3000;

//dbconnection


app.get('/',(req,res)=>{
    res.send('I am pretty ')
})



app.listen(port,()=>{
    console.log(`Server Listening on port http://localhost:${port}`)
})

const cors = require("cors");
app.use(cors());

//This is my index.js file