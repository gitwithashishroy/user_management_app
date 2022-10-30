const express = require('express') ; 
const app = express() ; 
// const port = 8000 ; 
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

// step 8 . express layouts
const expressLayouts = require('express-ejs-layouts') ; 

const db = require('./config/mongoose') ; 
app.use(express.urlencoded()) ;  



// extract style and script from subpages into layouts
app.set('layout extractStyles' , true ) ; 
app.set('layout extractScripts' , true ) ; 



// step 9 . use of static file
app.use(express.static('./assets')) ; 


//step 8 . use layouts and footer and header 
app.use(expressLayouts) ; 

// set view engine 
app.set('view engine' , 'ejs') ;
app.set("views" , './views') ; 


// route controller 
app.use('/' , require('./routes/routes')) ; 

app.listen(port  , function(err){
    if (err) {
        // interpolation using backtick 
        console.log(`Error in running the server : ${err}`);
      }
    console.log(`server is running on port : ${port}`);
}) ; 