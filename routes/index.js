const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    const { name } = req.user;
    res.render('index', { title: name })
  } else {
    res.render('index', { title: 'Express' });
  }
});

module.exports = router;
