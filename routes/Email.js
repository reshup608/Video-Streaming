var express = require('express');

var router = express.Router();
    path = require('path');
    nodeMailer = require('nodemailer');

    router.post('/sendemail', function (req, res) {
        console.log('maill',req.body) 
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED="0"

        let transporter = nodeMailer.createTransport({
            service:"gmail",
            auth: {
                user: 'videostreaming.user@gmail.com',
                pass: '9926648945',
            }
        });
        
        let mailOptions = {
            
            from: 'videostreaming.user@gmail.com', // sender address
            to:req.body.emailid, // list of receivers
            subject:'From VS.com', // Subject line
            text:'Verify VS Account', // plain text body
            html: '<b>Hi '+req.body.firstname+' <div>thank you so much for visiting VS.com! To finish signing up, you just need to confirm that we got your email right</div></b><div style="margin-left:80px;margin-top:14px"><a href=http://localhost:3001/user/updatestatus?emailid='+req.body.emailid+'><input type="button" value="Verify your email"></a></div><div style="margin-top:13px">Button not Working?Try pasting the link into your browse:</div><div>http://localhost:3001/user/updatestatus?emailid='+req.body.emailid+'</div>' // html body
            
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
            

            if (error) {
               return console.log(error);

            }
           console.log('Message sent');
            
            });
    
  
    });
    
    module.exports=router;
