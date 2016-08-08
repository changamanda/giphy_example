var express = require('express');
var router = express.Router();
var Gif = require('../models/gif');
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Gif.find({ }, function(err, gifs) {
    res.json(gifs);
  });
});

router.post('/', function(req, res, next) {
  var theme = req.body.theme;
  // console.log(theme);

  // https://github.com/request/request
  request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + theme, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(JSON.parse(body).data.image_original_url)
      var url = JSON.parse(body).data.image_original_url;

      var newGif = Gif({
        name: theme,
        url: url
      });
      newGif.save();
      res.redirect('/gifs');
    }
  })
});

router.get('/new', function(req, res, next) {
  res.render('gifs/new');
});

module.exports = router;
