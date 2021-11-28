var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('userAccounts/userAccountsList', { title: 'Express' });
});

router.get('/userAccountId', function(req, res, next) {
  res.render('userAccounts/userDetail', { title: 'Express' });
});

module.exports = router;
