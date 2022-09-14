const express = require('express') ; 
const router = express.Router() ; 

//step 6.2.a = access home controller 
const homeController = require('../controllers/home_controller'); 
const userController = require('../controllers/user_controller') ; 

console.log("router loaded");

//step 6.2.b get the home of homeController. 
router.get('/' , homeController.home) ; 
// router.get('./users' , require('./users')); 
router.get('/add-user' , userController.addUser); 
router.get('/update-user' , userController.updateUser) ; 

//api crud
router.post('/api/users' , userController.create) ; 
router.get('/api/users' , userController.find) ; 
router.put('/api/users/:id' , userController.update) ; 
router.delete('/api/users/:id' , userController.delete) ; 

 
// step 5.1.b
// export router to use it in index.js entry point
module.exports = router ; 