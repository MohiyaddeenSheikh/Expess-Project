// creating model for listing..
const mongoose = require("mongoose");
const connect = mongoose.connect;
const Schema = mongoose.Schema;
const model = mongoose.model;
dbname = "galaxypalace"
uri = "mongodb://127.0.0.1:27017/"+dbname;
//1. Connect 
async function run(){
  await connect(uri);
}
run().then(()=>{console.log("connected successfully")}).catch((err)=>{console.log("error =>",err)});
//2. create Schema
const listingSchema = new Schema({
  title:{type:String,required:true},
  description:{type:String},
  image:{type:String,
    default:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set:(v) => v === "" ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v },
  price:{type:Number},
  location:{type:String},
  country:{type:String}
})
//3. create Model = Table create

const Listing = model("Listing",listingSchema);

module.exports = Listing;