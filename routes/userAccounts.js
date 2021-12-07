var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {     
    res.render('userAccounts/userAccountsList', { title: 'Express' });
  }
  else   
      res.redirect('/login')
});

router.get('/userAccountId', function(req, res, next) {
  if(req.isAuthenticated()) {    
    res.render('userAccounts/userDetail', { title: 'Express' });
  }
  else   
      res.redirect('/login')
});

module.exports = router;
