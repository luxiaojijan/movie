var User = require('../models/user');

exports.signup = function (req,res){
    var _user = req.body.user;
    var user = new User(_user);
    user.save(function(err, user){
      if(err){
        console.log(err);
      }
      res.redirect('/admin/userlist/');
    })
}

exports.showSignin = function (req,res){
    res.render('signin',{
      title: '登陆界面'
    })
}
exports.showSignup = function (req,res){
    res.render('signup',{
      title: '注册界面'
    })
}

exports.signin = function (req,res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name: name},function(err,user){
    if(!user){
      res.redirect('/signup');
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
        res.redirect('/signin');
      }
    })
  })
}

exports.logout = function (req,res){
  delete req.session.user;
  // delete app.locals.user;
  res.redirect('/');
}
exports.login = function (req,res){
    res.render("/login",{title: "用户登录"});
}

exports.list = function (req, res) {
  User.fetch(function (err,users){
    if(err){
      console.log(err);
    }
    res.render('userlist', { 
      title: '用户列表页',
      users: users
    });
  });
}

exports.signinRequired = function (req, res,next) {
  var user = req.session.user;
  if(!user){
    return res.redirect('/signin');
  }
  next();
}

exports.adminRequired = function (req, res,next) {
  var user = req.session.user;
  if(user.role< 10){
    return res.redirect('/signin');
  }
  next();
}

exports.delete = function(req,res){
  var id = req.query.id;
  if(id){
    User.remove({_id: id}, function(err,movie){
      if(err){
        console.log(err);
      }else{
        res.json({success:1});
      }
    })
  }
}