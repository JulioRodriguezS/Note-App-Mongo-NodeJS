const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(
    db => {console.log('DB CONNECTED')}
)
.catch(
    err => {console.log('ERROR:', err)}
)