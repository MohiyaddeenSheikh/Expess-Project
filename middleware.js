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