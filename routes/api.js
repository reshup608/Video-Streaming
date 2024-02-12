var express = require('express'); 
var router = express.Router();
var cors= require("cors")
var request = require("request");


router.post('/sendotp',function(req,res){
   console.log(req.body)
   var springedge = require('springedge');
 
   var params = {
     'sender': 'SEDEMO',
     'apikey': '6925gb1sdem70j5u657o201129r41829h',
     'to': [
       '91'+req.body.phonenumber  //Moblie Numbers 
     ],
     'message': 'Hi, this is a test message'+req.body.otp,
     'format': 'json'
   };
    
   springedge.messages.send(params, 5000, function (err, response) {
     if (err) {
       return console.log(err);
     }
     console.log(response);
   });
  })


module.exports = router;