const wrapAsync = require('./utils/wrapAsync');
const {joiListingSchema,joiReviewSchema} = require("./schema");
const {Review, insertOneReview} = require("./model/review");

//joi as a middleware
const joiListingSchemaAsMiddleware=(req,res,next)=>{
  const result = joiListingSchema.validate(req.body);
    if(result.error){
      throw new ExpressError(400, result.error)
    }else{
      next()
    }
}
//express----------------------------------
const express = require("express");
const app =  express();

app.listen(3002, ()=>{console.log("listening on 3002 sucessfully..!")})



//for Login //1
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./model/user");

// session and flash
const session = require("express-session");
sessionOptions = { secret : "mysecretmoin", resave:false, saveUninitialized:true, cookie :{expires:Date.now()*7*24*60*60*1000,maxAge:7*24*60*60*1000, httpOnly:true} }
app.use(session(sessionOptions));
const flash = require("connect-flash");
app.use(flash());
//for Login //2
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())



// middleware for flash ==> using req.local to store in local 
app.use((req,res,next)=>{
  res.locals.sucessMsg = req.flash("success")
  res.locals.failMsg = req.flash("error")
  res.locals.currUser = req.user;
  next()
})





//ejs-------------------------------------
const ejsMate = require("ejs-mate");
app.engine('ejs',ejsMate);
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

app.get("/",(req,res)=>{
  res.redirect("/listing");
})

//TailwindCSS-----------------------------
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/images")));
app.use(express.static(path.join(__dirname,"/public")));

//mongoose----------------------------------
const mongoose = require('mongoose');
const Listing = require('./model/listing');

const {isLoggedIn} = require("./middleware");
app.get("/listing",isLoggedIn,wrapAsync(async (req,res)=>{
  await Listing.find({}).populate('').then((result)=>{res.render("index.ejs",{result})});
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const ObjectId = require('mongodb').ObjectId;

/* app.get("/listing/:id",(req,res)=>{
  res.render("showpage.ejs")
});  */ 


// use it on top of "/listing/:id "     !IMPORTANT
app.get("/listing/new",isLoggedIn,(req,res)=>{  
  res.render("new")
})

app.get("/listing/:id",isLoggedIn,wrapAsync(async (req,res)=>{
  try{
   let {id} = req.params;
   const listing = await Listing.findById(id).populate("reviews").populate("owner").catch((err)=>{console.log(err)});  //
   console.log(listing)
   if(!listing){
    req.flash("error","Listing doesn't exist..!")
    res.redirect("/listing")
   }
   res.render("show.ejs",{listing})
  }catch(err){
    console.log(err);
  }
}));
   
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
app.put("/listing/:id",joiListingSchemaAsMiddleware,wrapAsync(async (req,res)=>{
  const {id} = req.params;
  //const reconstructedListing =  
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  req.flash("success","Sucessfully Updated the Details..!");
  res.redirect("/listing");
}));

app.delete("/listing/:id",isLoggedIn,wrapAsync(async(req,res)=>{
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Deleted Sucessfully..!");
  res.redirect("/listing");  
}));


app.get("/listing/:id/edit",isLoggedIn,wrapAsync(async (req,res)=>{
  const result = await Listing.findById(req.params.id);
  if(!result){
    req.flash("error","Sorry..! Listing does not Exist.");
    res.redirect("/listing")
  }
  res.render("edit",{result})
}));



  app.post("/listing",[joiListingSchemaAsMiddleware,isLoggedIn],wrapAsync(async (req,res)=>{  
    const result = joiListingSchema.validate(req.body);
    if(result.error){
      throw new ExpressError(400, result.error)
    }
    
    const tupple = new Listing(req.body.listing)
    tupple.owner = req.user._id;
    await tupple.save();
    req.flash("success","Sucessfully Added..!");
    res.redirect("/listing");
  }))
//review
  const joiReviewSchemaAsMiddleware = (req,res,next)=>{
    const result = joiReviewSchema.validate(req.body);
    if(result.error){
      console.log(result.error)
      throw new ExpressError(400,result.error)
    }else{
      next()
    }
  }
  app.post("/listing/:id/review",[joiReviewSchemaAsMiddleware,insertOneReview],(req,res)=>{
    const url = "/listing/"+req.params.id;
    req.flash("success","Review Added Sucessfully..!");
    res.redirect(url)
    //res.redirect("/listing/:id")
  })
  app.delete("/listing/:id/review/:reviewid",wrapAsync(async(req,res)=>{
    const resultReview = await Review.findByIdAndDelete(req.params.reviewid)
    const result = await Listing.findByIdAndUpdate(req.params.id, {$pull:{reviews:req.params.reviewid}})
    const url = "/listing/"+req.params.id;
    req.flash("success","Review Deleted Sucessfully...! ");
    res.redirect(url)
  }))

  app.put("/listing/:id/review",wrapAsync(async(req,res)=>{
    const {reviewUpdateId,ratingUpdateReview,review} = req.body;
    await Review.findByIdAndUpdate(reviewUpdateId,{review:review,rating:ratingUpdateReview})
    const url = "/listing/"+req.params.id;
    req.flash("success","Review Updated Sucessfully..!");
    res.redirect(url)
  }))

const ExpressError = require('./utils/ExpressError');

// access routes/user.js
const userRouter = require("./routes/user"); //1 .user route require
app.use("/",userRouter); 



app.all("*",(req,res,next)=>{
  next(new ExpressError("404","page not found"));
})

  app.use((err,req,res,next)=>{
    //console.log(typeof(err.statusCode))
    let {statusCode=500,message} =err;
    //console.log("=>",statusCode)
    if(err.statusCode == "404"){
      res.status(statusCode).render("pagenotfound")
    }else{
      res.status(statusCode).render("somethingWentWrong",{message});
    }
  })

//write a js program to sum two number




