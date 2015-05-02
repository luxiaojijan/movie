var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');

module.exports = function (app){
  
  app.use(function(req,res,next){
    var _user = req.session.user;
    if(_user){
      app.locals.user = _user;
    }
    return next();
  })
  
  //Index
  app.get('/',Index.index);

  //User
  app.post('/user/signin',User.signin);
  app.post('/user/signup',User.signup);
  app.get('/logout',User.logout);
  app.get('/admin/userlist',User.list);

  //Movie
  app.get('/movie/:id',Movie.detail);
  app.get('/movie/new',Movie.new);
  app.get('/admin/update/:id',Movie.update);
  app.post('/admin/movie',Movie.save);
  app.get('/admin/list',Movie.list);
  app.post('/admin/list',Movie.delete);
}