/**
 * Created by luhuijian on 15/5/19.
 */

var mongoose = require('mongoose')
var Catetory = mongoose.model('Catetory');

exports.new = function(req, res) {
  res.render('catetory_admin', {
    title: '网站后台的分类录入页',
    catetory: {}
  });
};

exports.save = function (req,res){
  var _catetory = req.body.catetory;
  var catetory= new Catetory(_catetory);

  catetory.save(function (err,catetory){
      if(err){
        console.log(err);
      }
      res.redirect('/admin/catetory/list')
    });
  };

exports.list = function (req, res) {
  Catetory.fetch(function (err,catetories){
    if(err){
      console.log(err);
    }
    res.render('catetorylist', {
      title: '分类列表页',
      catetories: catetories
    });
  });
};
