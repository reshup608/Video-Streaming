var express =require('express')
var router =express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/addnewepisode',upload.any(),function(req,res,next){
    console.log(req.body)
    console.log(req.files)
    
    pool.query('insert into episodes(videoid,episodetitle,episodedescription,episodeicon,episodeurl) values(?,?,?,?,?)',[req.body.videoId,req.body.episodeTitle,req.body.episodeDescription,req.files[0].filename,req.files[1].filename],function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json({RESULT:false})
        }
        else{
            return res.status(200).json({RESULT:true})
        }
    })
})

router.get('/displayAllEpisode',function(req,res,next){
    pool.query('select * from episodes',function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json([])
        }
        else{
            return res.status(200).json(result)
        }
    })
})

router.post('/editData',function(req,res,next){
    console.log(req.body)
    pool.query('update episodes set episodetitle=?,episodedescription=? where episodeid=?',[req.body.episodeTitle,req.body.episodeDescription,req.body.episodeId],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:true})
      }
    })
  })
  
  router.post('/delete',function(req,res,next){
    console.log(req.body)
    pool.query('delete from episodes where episodeid=?',[req.body.episodeId],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:true})
      }
    })
  })
  
//   router.post('/editIcon',upload.single('videoIcon'),function(req,res,next){
//     console.log(req.body)
//     pool.query('update videos set videoicon=? where videoid=?',[req.file.filename,req.body.videoId],function(error,result){
//       if(error){
//         console.log(error)
//         return res.status(500).json({RESULT:false})
//       }
//       else{
//         return res.status(200).json({RESULT:true})
//       }
//     })
//   })
  
  router.post('/editVideo',upload.any(),function(req,res,next){
    console.log(req.files)
  console.log(req.body)
  if( req.files[0].mimetype=='image/jpg' || req.files[0].mimetype=='image/jpeg' || req.files[0].mimetype=='image/png'  ){
    console.log("3")
    if(req.body.episodeUrl==''){
      console.log("1")
      pool.query('update episodes set episodeicon=? where episodeid=?',[req.files[0].filename,req.body.episodeId],function(error,result){
        if(error){
          console.log(error)
          return res.status(500).json({RESULT:false})
        }
        else{
          return res.status(200).json({RESULT:true})
        }
      })
    }
    else{
      console.log("2")
    pool.query('update episodes set episodeicon=?,episodeurl=? where episodeid=?',[req.files[0].filename,req.files[1].filename,req.body.episodeId],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:true})
      }
    })
    }
  }
  else if( req.files[0].mimetype=='video/mp4' || req.files[0].mimetype=='video/mpeg'  ){
    console.log("4")
    if(req.body.episodeIcon==''){
      console.log("1")
    pool.query('update episodes set episodeurl=? where episodeid=?',[req.files[0].filename,req.body.episodeId],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:true})
      }
    })
  }
  else{
    console.log("2")
    pool.query('update episodes set episodeurl=?,episodeicon=? where episodeid=?',[req.files[0].filename,req.files[1].filename,req.body.episodeId],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json({RESULT:false})
      }
      else{
        return res.status(200).json({RESULT:true})
      }
    })
  }
  }
  })

  router.post('/fetchByVideoId',function(req,res,next){
    pool.query('select * from episodes where videoid=?',[req.body.videoId],function(error,result){
      if(error){
        console.log(error)
        return res.status(500).json([])
      }
      else{
        return res.status(200).json(result)
      }
    })
  })

  router.post('/fetchByEpisodeId',function(req,res,next){
    console.log(req.body)
    pool.query('select * from episodes where episodeid=?',[req.body.episodeId],function(error,result){
        if(error){
            console.log(error)
            return res.status(500).json([])
        }
        else{
          console.log(result)
            return res.status(200).json(result)
        }
    })
})


module.exports=router;