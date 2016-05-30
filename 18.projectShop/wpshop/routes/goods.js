var express = require('express');
var models = require('../models');
var async = require('async');
var router = express.Router();
router.post('/add',function(req,res){
  var _id = req.body._id;
  console.log(_id);
  if(_id){
    models.Goods.update({_id:_id},req.body,function(err,goods){
      if(err){
        res.json(500,{msg:err})
      }else{
        res.json(goods)
      }
    });
  }else {
    new models.Goods({name: req.body.name, price: req.body.price, imgSrc: req.body.imgSrc}).save(function (err, good) {
      console.log(good);
      if (err) {
        res.json(500, {msg: err})
      } else {
        res.json(good)
      }
    });
  }
});
router.post('/delete',function(req,res){
  models.Goods.remove({_id:req.body._id},function(err,result){
    console.log(result);
    if (err) {
      res.json(500, {msg: err})
    } else {
      res.json(result)
    }
  });
});
router.post('/batchDelete',function(req,res){
  var _ids = req.body._ids;
  var tasks = [];
  _ids.forEach(function(_id){
    tasks.push(function(callback){
      models.Goods.remove({_id:_ids},callback);
    });

  });
  async.parallel(tasks,function(err,result){
    if (err) {
      res.json(500, {msg: err})
    } else {
      res.json(result)
    }
  });

});
router.get('/list',function(req,res){

  models.Goods.find({},function(err,goods){
    if(err){
      res.json(500,{msg:err})
    }else{
      res.json(goods)
    }
  });
});
module.exports = router;
