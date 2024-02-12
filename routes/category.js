var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
router.post('/addnewrecord',upload.single('categoryIcon'),function(req, res, next) {
  console.log(req.body)
  pool.query('insert into categories(categoryName,categoryDescription,categoryIcon)values(?,?,?)',[req.body.categoryName,req.body.categoryDescription,req.file.filename],function(error,result){
     
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
  router.get('/displayall',function(req, response, next) {
   pool.query('select * from categories',function(error,result){
     if(error)
     {return response.status(500).json([])}
     else{
      return response.status(200).json(result)
     }

   })


  })

  router.post('/editdata',function(req, res, next) {
    pool.query('update categories set categoryname=?,categorydescription=? where categoryid=?',[req.body.categoryName,req.body.categoryDescription,req.body.categoryId],function(error,result){
       
      if(error)
     {
        return res.status(500).json({RESULT:false})}
  
     else
     {
      return res.status(200).json({RESULT:true})
     }
  
    })  
    });


    router.post('/editIcon',upload.single('categoryIcon'),function(req, res, next) {
      pool.query('update  categories set categoryicon=? where categoryid=?',[req.file.filename,req.body.categoryId],function(error,result){
         
        if(error)
       {
          return res.status(500).json({RESULT:false})}
    
       else
       {
        return res.status(200).json({RESULT:true})
       }
    
      })  
      });

      router.post('/deleteRecord',function(req, res, next) {
        pool.query('delete from  categories where categoryid=?',[req.body.categoryId],function(error,result){
           
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