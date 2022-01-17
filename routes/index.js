const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    res.render('index', { title: 'Express' });
  }
  else   
      res.redirect('/login')
});

module.exports = router;
