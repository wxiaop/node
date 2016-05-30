var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var router = express.Router();

function encrypt(content){
  return crypto.createHash('md5').update(content).digest('hex');
}

router.post('/validate',function(req,res){
  var userId = req.session.userId;
  if(userId){
    models.User.findOne({_id:userId},function(err,user){
      if(err){
        res.json(401,{msg:err})
      }else{
        res.json(user)
      }
    });
  }else{
    res.json(user);
  }
});
router.post('/logout',function(req,res){
  req.session.userId = null;
  res.json({msg:'退出成功'});
});
router.post('/reg',function(req,res){
  var user = req.body;
  var md5Email = encrypt(user.email);
  var avatar = "https://secure.gravatar.com/avatar/"+md5Email+"?s=48"
  new models.User({username:user.username,password:encrypt(user.password),email:user.email,avatar:avatar}).save(function(err,result){
    if(err){
      res.json(500,{msg:err})
    }else{
      res.json(result)
    }
  });
});
router.post('/login',function(req,res){
  var user = req.body;
  console.log(user.username,encrypt(user.password));
  models.User.findOne({username:user.username,password:encrypt(user.password)},function(err,user){
   console.log(user);
    if(err){
      res.status(500).json({msg:err});
    }else{
      if(user){
        console.log('come in');
        req.session.userId = user.id;
        res.json(user);
      }else{
        res.status(401).json({msg:'此用户不合法'});
      }
    }

  });

});

module.exports = router;
