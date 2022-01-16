var express = require('express');
var router = express.Router();

const controller = require('../controllers/user.controller');

router.get('/detail', controller.getUserDetail);
router.get('/', controller.getUsers);
router.get('/:page', controller.getUsers);

router.get('/userAccountId', function(req, res, next) {
  if(req.isAuthenticated()) {    
    res.render('userAccounts/userDetail', { title: 'Express' });
  }
  else   
      res.redirect('/login')
});

module.exports = router;
