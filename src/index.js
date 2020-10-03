const express = require('express') 
const app = express()
const path = require('path')
const exphdbs = require('express-handlebars')
const methodOverride = require('method-override')
const expressSession = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
//initializations
require('./database')
require('./config/passport')

//settings
app.set('port',process.env.PORT || 3000)
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', exphdbs({
    defaultLayout:'main',
    layoutDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partial'),
    extname:'hbs'
}))
app.set('view engine', '.hbs')

//middleware
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.use(expressSession({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


//global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.errors = req.flash('errors')
    res.locals.error = req.flash('error')
    res.locals.user = req.user
    next()
})


//routes
app.use(require('./routes/index'))
app.use(require('./routes/notes'))
app.use(require('./routes/users'))


//static files
app.use(express.static(path.join(__dirname,'public')))

//listening server 
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})