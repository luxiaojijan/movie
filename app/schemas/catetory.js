/**
 * Created by luhuijian on 15/5/13.
 */
var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CatetorySchema = new Schema({
  name: String,
  movies: [{type:ObjectId,ref:'Movie' }],
  meta: {
    // 录入数据或者更新数据的时间
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

CatetorySchema.pre('save',function(next){
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else
  {
    this.meta.updateAt=Date.now();
  }
  next();
});

CatetorySchema.statics= {
  // fetch方法用来取出数据库里面所有数据
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      // 按照更新时间
      .exec(cb)
  },
  // 查询单条的数据
  findById: function(id,cb){
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = CatetorySchema;
