const mongoose = require('mongoose') ; 

const userSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true 
    } , 
    email : {
        type : String ,
        required : true , 
        unique : true 
    },
    gender : String , 
    status : String 
})

const userdb = mongoose.model('userdb' , userSchema) ; 

module.exports = userdb ; 