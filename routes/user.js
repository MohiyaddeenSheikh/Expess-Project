const express = require("express");  //1
const router = express.Router();   //2


router.get("/signup",(req,res)=>{
  res.render("users/signup")
})



//parser middleware for req.body
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}))
//require model and passport
const User = require("../model/user");
const passport = require("passport");

router.post("/signup",async(req,res)=>{
  try{
    const {username,email,password} = req.body;
    const newUser = new User({email,username}); // password will handle by passport
    let regUser = await User.register(newUser, password); // 
    req.login(regUser,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","User Sucessfully Registered")
      res.redirect("/listing")
    })
    console.log(regUser)
     

  }catch(e){
    req.flash("error",e.message);
    res.redirect("/signup")
  }
})

router.get("/login",(req,res)=>{
  res.render("users/login.ejs")
})
const {savedRedirectUrl} = require("../middleware")
router.post("/login",savedRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),(req,res)=>{
  console.log("-------------------------", res.locals.redirectUrl )
  req.flash("success","welcome "+req.body.username)
  let redirectUrl = res.locals.redirectUrl || "\listing";
  res.redirect(redirectUrl)
  //res.redirect("/listing")
})

router.get("/logout",(req,res,next)=>{ 
  req.logout((err)=>{if(err){next(err)}})
  req.flash("success","Logged out ");
  res.redirect("/login")
})

module.exports = router//3