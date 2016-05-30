var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../public/index', { title: '商城Test' });
});

module.exports = router;
