const mongoose = require("mongoose");
const Listing = require("./listing");
const ExpressError = require("../utils/ExpressError");
//1. connect
const connect  = mongoose.connect;
const db = "galaxypalace";
const uri = "mongodb://127.0.0.1:27017/"+db;
async function dbconnect(){
  await connect(uri)
}
dbconnect().then(()=>{console.log("database galaxypalace is sucessfully connected..!")});

//2. create schema
const schema = mongoose.Schema;
const reviewSchema = new schema({
  review:{type:String,require},
  rating:{type:Number, min:1,max:5,require},
  createdAt:{type:Date, default:Date.now() }
})

//3. create model
const model = mongoose.model;
const Review = model("Review",reviewSchema);

async function insertOneReview(req,res,next){
  try{
  console.log(req.params.id)
  const listing = await Listing.findById(req.params.id);
  const review1 = await new Review({
    review:req.body.review,
    rating:req.body.ratingReview,
  })
  await review1.save()
  await listing.reviews.push(review1)
  await listing.save()
  console.log(listing)
  //res.send(listing)
  next()
  }catch(err){
    const myerr = new ExpressError(400,"Error inside review"); 
    next(myerr)
  }
}






module.exports = {Review,insertOneReview}
