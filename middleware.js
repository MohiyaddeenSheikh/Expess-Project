const Listing = require("./model/listing")

module.exports.isLoggedIn = (req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.redirectUrl = req.path
    console.log(req.path,"....",req.orignalUrl)
    req.flash("error","Log In to Access")
    res.redirect("/login")
  }
  next()
}
module.exports.savedRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
  res.locals.redirectUrl =  req.session.redirectUrl
  }
  next();
}

module.exports.isOwner= async (req,res,next) => {
  const {id} = req.params;
  let listing = await Listing.findById(id)
  if(res.locals.currUser && !listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","you dont have enough permissions.");
    return res.redirect("/listing");
  }
  next()
}