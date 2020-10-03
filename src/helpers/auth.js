const helpers = {}

helpers.isAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated){
        next()
    }else{
        req.flash('error_msg','User Not Authorized, Please Log In or Sign Up.')
        res.redirect('/users/signin')
    }    
}

module.exports = helpers