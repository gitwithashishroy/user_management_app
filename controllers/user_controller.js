const { default: axios } = require('axios');
const userdb = require('../models/schema') ; 

module.exports.addUser = function(req , res){
    return res.render('add_user' , {
        title : "add-user" 
    }) ; 
} 


module.exports.updateUser = function(req , res){
axios.get('http://localhost:8000/api/users' , { params : {id : req.query.id}})
.then((response) => {
    console.log(response.data)
    res.render('update_user' , {title : "update-user" , 
        users : response.data}) ; 
  })
  .catch(err =>{
    res.send(err) ; 
  })
     
}


// create and save new user
module.exports.create = function(req , res){
    // validate request 
    if(!req.body){
        res.status(400).send({message : "Content can not be empty"}) ;
        return ; 
    }

    // new user 
    var user = new userdb({
        name : req.body.name ,
        email : req.body.email , 
        gender : req.body.gender ,
        status : req.body.status 
    })

    // save user in the data base 
    .save(user)
    .then(data =>{
        res.redirect('/add-user') ;  
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation "
        }); 
    });

}

// retrive and return all users and return a single user 
module.exports.find = function(req , res){
    if(req.query.id){
        const id = req.query.id ;   
        userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message : "Not found user id with id" + id})
            }else {
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message : "Error retrieving user with id" + id})
        })

    }else{
        userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message : err.message || "Error occured while retriving data from database"}) ; 
        })
    }  
}


// update a new identified user by user id
module.exports.update = function(req , res){
    if(!req.body){
        return res.status(400).send({message : "Data to update cannot be empty"}) ; 
    }
    const id = req.params.id ; 
    userdb.findByIdAndUpdate(id , req.body, {useFindAndModify : false})
    .then(data=>{
        if(!data){
            return res.status(404).send({message : `Cannot update user with ${id} . Maybe user not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message : "Error Update user information"}) ; 
    })
}


// delete a user with specified id in request
module.exports.delete = function(req , res){
    const id = req.params.id ; 
    userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message : `cannot delete with id ${id }. Maybe id is wrong`})
        }else {
            res.send({message :" User was deleted successfully !"})
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "could not delete user wiht id" + id 
        }) ; 
    }) ; 
}


