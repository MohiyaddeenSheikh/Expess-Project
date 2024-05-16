const mongoose = require("mongoose");
 let {data} = require("./data.js");
const Listing = require("../model/listing.js");

const connect = mongoose.connect;
dbname = "galaxypalace"
uri = "mongodb://127.0.0.1:27017/"+dbname;
//1. Connect 
async function run(){
  await connect(uri);
}
run().then(()=>{console.log("connected successfully")}).catch((err)=>{console.log("error =>",err)});

const initDB = async ()=>{
  await Listing.deleteMany({});
  data = data.map((x)=>({...x,owner:"6644a6b1cb6d6a25c841cfe1"}))
  await Listing.insertMany(data).then(()=>{console.log("db initialized..!")});
  
}
initDB();