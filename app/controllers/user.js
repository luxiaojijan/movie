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

exports.signin = function (req,res){
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