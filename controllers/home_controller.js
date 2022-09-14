const axios = require('axios') ; 

module.exports.home = function(req , res){

  axios.get('http://localhost:8000/api/users')
  .then((response) => {
    console.log(response.data)
    res.render('home' , {title : "crud app" , 
        users : response.data}) ; 
  })
  .catch(err =>{
    res.send(err) ; 
  })

//  return res.render('home' , {
//         title : "crud application" , 
//         users : "New Data"
//     }); 
}


