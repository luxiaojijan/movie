var Movie = require('../models/movie');
var _ = require('underscore');
// 详情页
exports.detail = function(req, res) {
  var id = req.params.id;
  Movie.findById(id,function (err,movie){
      res.render('detail', { 
        title: '网站详情页'+ movie.title,
        movie: movie
      });
  })
}

exports.new = function(req, res) {
  res.render('admin', { 
    title: '网站后台录入页',
    movie:{
      title: '',
      doctor: '',
      country: '',
      language: '',
      poster: '',
      flash:'',
      year: '',
      summary: ''
    }
  });
}

exports.save = function (req,res){
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if(id !== 'undefined'){
    Movie.findById(id, function (err,movie){
      if(err){
        console.log(err);
      }
      _movie = _.extend(movie,movieObj);
      _movie.save(function (err,movie){
        if(err){
          console.log(err);
        }
        res.redirect('/movie/' + _movie.id)
      })
    })
  }else{
        _movie= new Movie({
          doctor: movieObj.doctor,
          title: movieObj.title,
          country: movieObj.country,
          language: movieObj.language,
          year: movieObj.year,
          poster: movieObj.poster,
          summary: movieObj.summary,
          flash: movieObj.flash,
        });

        _movie.save(function (err,movie){
          if(err){
            console.log(err);
          }
          res.redirect('/movie/' + _movie.id)
        });
      }
}

exports.update = function (req,res){
  var id = req.params.id;

  if(id){
    Movie.findById(id,function (err,movie){
      res.render('admin',{
        title: '后台更新页面',
        movie: movie
      });
    });
  }
}
// 后台录入页面
exports.list = function (req, res) {
  Movie.fetch(function (err,movies){
    if(err){
      console.log(err);
    }
    res.render('list', { 
      title: '列表页',
      movies: movies
    });
  });
}

exports.delete = function(req,res){
  var id = req.query.id;
  if(id){
    Movie.remove({_id: id}, function(err,movie){
      if(err){
        console.log(err);
      }else{
        res.json({success:1});
      }
    })
  }
}