const router = require('express').Router()
const User = require('../models/User')
const passport = require('passport')

router.get('/users/signin',(req,res,next)=>{
    res.render('users/signin')
})

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/users/signup',(req,res,next)=>{
    res.render('users/signup')
})

router.post('/users/signup', async(req,res,next)=>{
    const {name, email, password, confirm_password} = req.body
    const errors=[]
    if((name || email || password) === ''){
        errors.push('BUT, Put something in the inputs!')
    }
    if(password != confirm_password){
        errors.push('The password and the confirm password must be match case')
    }
    if(errors.length > 0){
        res.render('users/signup',{errors,name,email,password})          
    }else{

        const newUser = new User({name,email,password})   

        if(newUser.email == User.findOne({email:email})){
            req.flash('error_msg','The E-mail is allready in use! please take another one')
            res.redirect('/users/signup')
        }
        
        newUser.password = await newUser.encryptPassword(password)

        await newUser.save()
        .then(
            req.flash('success_msg','Saved User... Welcome!')            
        )
        .catch((err)=>{
            req.flash('error_msg',`Something went wrong :( -> ${err}`)
            res.redirect('/users/signup')
        })
        res.redirect('/users/signin')
    } 
})

router.get('/users/logout',(req,res,next)=>{
    req.logout()
    res.redirect('/')
})

module.exports = router

