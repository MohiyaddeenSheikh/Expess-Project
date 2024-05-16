
const mongoose = require("mongoose");
const connect = mongoose.connect;
const Schema = mongoose.Schema;
const model = mongoose.model;
const passportLocalMongoose = require("passport-local-mongoose")
dbname = "galaxypalace"
uri = "mongodb://127.0.0.1:27017/"+dbname;
//1. Connect 
async function run(){
  await connect(uri);
}
run().then(()=>{console.log("connected successfully")}).catch((err)=>{console.log("error =>",err)});
//2. create Schema
const userSchema = new Schema({
  email:{type:String,
        requsted:true
      }
})
userSchema.plugin(passportLocalMongoose);
//3. Create model and export
module.exports = model("User",userSchema); 