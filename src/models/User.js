const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    createdDate:{
        type: Date,
        default: Date.now
    }
})

userSchema.methods.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    const hash = bcrypt.hash(password, salt)
    return hash 
}

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', userSchema)