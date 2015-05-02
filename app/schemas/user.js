var mongoose=require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
	name:{
		unique: true,
		type: String
	},
	role:{
		type: Number,
		default: 0,
	},
	password: String,
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

UserSchema.pre('save',function(next){
	var user = this;

	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else
	{
		this.meta.updateAt=Date.now();
	}
	
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
		if(err) return next(err)
		bcrypt.hash(user.password,salt,function(err,hash){
			if(err) return next(err)
			user.password = hash;
			next();
		});
	})
});

UserSchema.methods ={
	comparePassword: function(_password, cb){
		bcrypt.compare(_password,this.password,function(err,isMathed){
			if(err){
				console.log(err);
			}
			cb(null,isMathed);
		})
	}
}

UserSchema.statics= {
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

module.exports = UserSchema;