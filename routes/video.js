var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload = require('./multer')


router.post('/addnewrecord',upload.any(), function(req, res, next) {
  console.log(req.body)
  console.log(req.files)
  pool.query('insert into video(videoid,subcategoryid,videotitle,videometadata,videodescription,status,amount,poster,videourl,statusepisode) values(?,?,?,?,?,?,?,?,?,?)',[req.body.videoid,req.body.subcategoryid,req.body.videotitle,req.body.videometadata,req.body.videodescription,req.body.status,req.body.amount,req.files[0].filename,req.files[1].filename,req.body.statusepisode],function(error,result){
      if(error)
      {
          console.log(error)
          return res.status(500).json({RESULT:false})
      }
      else{
          return res.status(200).json({RESULT:true})
      }
  })
});
router.get('/displayall',function(req,res,next){
  console.log(req.body)
  pool.query('select * from video',function(error,result){
    if(error)
        {
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }

  })
});
router.post('/displayBySubCategoryId',function(req,res,next){
  console.log(req.body)
  pool.query('select * from video where subcategoryid=?',[req.body.subcategoryid],function(error,result){
    if(error){
      console.log(error)
      return res.status(500).json([])
    }
    else{
      console.log(result)
      return res.status(200).json(result)
    }
  })
});
router.post('/editicon',upload.any(),function(req, res, next) {
  console.log(req.body)
  console.log(req.files)
  if(req.files[0].mimetype=='image/png' || req.files[0].mimetype=='image/jpg' || req.files[0].mimetype=='image/jpeg' ){
    if(req.body.videoUrl==''){
      pool.query('update video set poster=? where videoid=?',[req.files[0].filename,req.body.videoid],function(error,result){
        if(error)
       {
          return res.status(500).json({RESULT:false})}
    
       else
       {
        return res.status(200).json({RESULT:true})
       }
    
      })      
    }
    else{
      pool.query('update video set poster=?,videourl=? where videoid=?',[req.files[0].filename,req.files[1].filename,req.body.videoid],function(error,result){
     
        if(error)
       {
          return res.status(500).json({RESULT:false})}
    
       else
       {
        return res.status(200).json({RESULT:true})
       }
    
      })  
    }
  }
  else if(req.files[0].mimetype=='video/mp4'){
    if(req.files[1].filename==''){
      pool.query('update video set videourl=? where videoid=?',[req.files[0].filename,req.body.videoid],function(error,result){
     
        if(error)
       {
          return res.status(500).json({RESULT:false})}
    
       else
       {
        return res.status(200).json({RESULT:true})
       }
    
      })
    }

  }
    });

router.post('/editData',function(req, res, next) {
  console.log(req.body)
  pool.query('update video set videotitle=?,videometadata=?,videodescription=?,amount=? where videoid=?',[req.body.videotitle,req.body.videometadata,req.body.videodescription,req.body.amount,req.body.videoid],function(error,result){
    
    if(error)
   {
     console.log(error)
      return res.status(500).json({RESULT:false})}
   else
   {
    return res.status(200).json({RESULT:true})
   }

  })  
  });
  router.post('/deleteRecord',function(req, res, next) {
    console.log(req.body)
    pool.query('delete from  video where videoid=?',[req.body.videoid],function(error,result){
       
      if(error)
     {
         console.log(error)
        return res.status(500).json({RESULT:false})}
  
     else
     {
         console.log(result)
         console.log(res.body)
      return res.status(200).json({RESULT:true})
     }
  
    })  
    });
module.exports = router;
