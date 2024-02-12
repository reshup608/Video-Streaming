var express = require('express');
var router = express.Router();
var pool = require('./pool')

router.post('/newuser', function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query('insert into userinfo(firstname, lastname, phonenumber, emailid, password,status) values(?,?,?,?,?,?)',
     [req.body.firstname, req.body.lastname, req.body.phonenumber, req.body.emailid, req.body.password,'Not Verify'], function (error, result) {
      if (error) {
        console.log(error)
        return res.status(500).json({
          RESULT: false
        })
      } else {
        return res.status(200).json({
          RESULT: true
        })
      }
  
    })
  
  });

router.get('/updatestatus',function(req,res,next){
  console.log(req.query)
  pool.query("update userinfo set status= 'Verified' where emailid=?",[req.query.emailid],function (error,result){
    if (error) {
      console.log(error)
      return res.status(500).json({
        RESULT: false
      })
    } else {
     return res.redirect('http://localhost:3000/UserMainPage')
      }

  })

})
router.post('/checkemailandmobile', function (req, res, next) {
  console.log(req.body)
  pool.query("select * from userinfo where (emailid=? or phonenumber=?) and status='Verified'", [req.body.emailorphone,req.body.emailorphone], function (error, result) {
      if (error) {
          console.log(error)
          return res.status(500).json({
              RESULT: false
          })
      } else {
          if (result.length == 0) {
              console.log(error)
              return res.status(500).json({
                  RESULT: false
              })
          } else {
              console.log(result)
              return res.status(200).json({
                  RESULT: result
              })
          }
      }

  })

});

router.post('/checkuserlogin', function (req, res, next) {
    console.log(req.body)
    pool.query("select * from userinfo where emailid=? and password=? and status='Verified'", [req.body.emailid, req.body.password], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({
                RESULT: false
            })
        } else {
            if (result.length == 0) {
                console.log(error)
                return res.status(500).json({
                    RESULT: false
                })
            } else {
                console.log(result)
                return res.status(200).json({
                    RESULT: result
                })
            }
        }

    })

});
module.exports = router;