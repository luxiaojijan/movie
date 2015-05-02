var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var User = require('../models/user');
var _ = require('underscore');
// 网站首页
router.get('/', function(req, res) {
  console.log('user in session');
  console.log(req.session.user);
  Movie.fetch(function(err,movies){
    if(err){
      console.log(err);
    }
    res.render('index', { 
      title: '网站首页',
      movies: movies,
    });
  })
});

router.post('/user/signup/',function (req,res){
    var _user = req.body.user;
    var user = new User(_user);
    user.save(function(err, user){
      if(err){
        console.log(err);
      }
      res.redirect('/admin/userlist/');
    })
});

router.post('/user/signin/', function (req,res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name: name},function(err,user){
    if(!user){
      res.redirect('/');
    }
    user.comparePassword(password,function(err,isMathed){
      if(err){
        console.log(err);
      }
      if(isMathed){
        req.session.user = user;
        console.log('the password is correct!');
        res.redirect('/');
      }else{
        console.log('the password is not correct!');
      }
    })
  })
})

router.get('/login',function (req,res){
    res.render("/login",{title: "用户登录"});
});
// 详情页
router.get('/movie/:id', function(req, res) {
  var id = req.params.id;
  Movie.findById(id,function (err,movie){
      res.render('detail', { 
        title: '网站详情页'+ movie.title,
        movie: movie
      });
  })
  
});

// 后台录入页面
router.get('/admin/movie/', function(req, res) {
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
});

router.post('/admin/movie/new',function (req,res){
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
});

router.get('/admin/update/:id',function (req,res){
  var id = req.params.id;

  if(id){
    Movie.findById(id,function (err,movie){
      res.render('admin',{
        title: '后台更新页面',
        movie: movie
      });
    });
  }
});
// 后台录入页面
router.get('/admin/list/', function (req, res) {
  Movie.fetch(function (err,movies){
    if(err){
      console.log(err);
    }
    res.render('list', { 
      title: '列表页',
      movies: movies
    });
  });
});

router.get('/admin/userlist/', function (req, res) {
  User.fetch(function (err,users){
    if(err){
      console.log(err);
    }
    res.render('userlist', { 
      title: '用户列表页',
      users: users
    });
  });
});

router.post('/admin/list',function(req,res){
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
})

module.exports = router;
