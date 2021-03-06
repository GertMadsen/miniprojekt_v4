var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var JobSchema = new Schema({
  type: String,
  company: String,
  companyUrl : String
})
var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  userName : {type: String,required:true,unique:true},
  password : {type: String,required:true},
  email: {type: String, required: true},
  job: [JobSchema],
  created : {type: Date, default: Date.now},
  lastUpdated : Date
});

UserSchema.pre("save",function(next){
  this.password = "hash_me_and_add_some_salt "+this.password;
  this.lastUpdated = new Date();
  next();
})

UserSchema.pre("update",function(next){
  this.update({},{$set : {lastUpdated: new Date()}});
  next();
 })

module.exports = mongoose.model("User",UserSchema);