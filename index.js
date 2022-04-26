const express = require('express')
const app = express()
require('./db')
require('./middlewares').useMiddlewares(express, app)
app.listen(8080, ()=>{
    console.log('Listening port on 8080');
})
 
