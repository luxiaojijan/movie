var Movie = require('../models/movie');
var Catetory = require('../models/catetory');
exports.index = function (req, res) {
  Catetory
    .find({})
    .populate({path: 'movies', options: {limit: 5}})
    .exec(function (err, catetories) {
      Movie.fetch(function (err, movies) {
        if (err) {
          console.log(err);
        }
        res.render('index', {
          title: '网站首页',
          catetories: catetories
        });
      });
    });
}
