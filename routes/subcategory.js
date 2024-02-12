var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload = require('./multer')
router.post('/addnewrecord',upload.single('subcategoryIcon'), function(req, res, next) {
    console.log(req.body)
    pool.query('insert into subcategories(subcategoryname,subcategorydescription,categoryid,subcategoryIcon) values(?,?,?,?)',[req.body.subcategoryname,req.body.subcategorydescription,req.body.categoryid,req.file.filename],function(error,result){
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
    pool.query('select * from subcategories',function(error,result){
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
router.post('/editData',function(req,res,next){
    console.log(req.body)
    pool.query('update subcategories set subcategoryname=?,subcategorydescription=? where subcategoryid=?',[req.body.subcategoryName,req.body.subcategoryDescription,req.body.subcategoryId],function(error,result){
        
        if(error)
        {
            console.log(error)
            return res.status(500).json({RESULT:false})
        }
        else{
            console.log(res.body)
            return res.status(200).json({RESULT:true})
        }


    })
});



      router.post('/editIcon',upload.single('subcategoryIcon'),function(req, res, next) {
        console.log(req.body)
        console.log(req.file)
        pool.query('update  subcategories set subcategoryicon=? where subcategoryid=?',[req.file.filename,req.body.subcategoryId],function(error,result){ 
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
        router.post('/displayByCategoryId',function(req,res,next){
            console.log(req.body)
            pool.query('select * from subcategories where categoryid=?',[req.body.categoryid],function(error,result){
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
          router.post('/deleteRecord',function(req, res, next) {
            pool.query('delete from  subcategories where subcategoryid=?',[req.body.subcategoryId],function(error,result){
               
              if(error)
             {
                return res.status(500).json({RESULT:false})}
          
             else
             {
              return res.status(200).json({RESULT:true})
             }
          
            })  
            });
  
module.exports = router;