//express----------------------------------
const express = require("express");
const app =  express();

app.listen(3002, ()=>{console.log("listening on 3002 sucessfully..!")})


//ejs-------------------------------------
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))

app.get("/",(req,res)=>{
  res.render("index");
})

//TailwindCSS-----------------------------
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/images")));

//mongoose----------------------------------
const mongoose = require('mongoose');
const Listing = require('./model/listing');

app.get("/listing",async (req,res)=>{
  await Listing.find({}).then((result)=>{res.render("index.ejs",{result})});

})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const ObjectId = require('mongodb').ObjectId;

/* app.get("/listing/:id",(req,res)=>{
  res.render("showpage.ejs")
});  */ 


// use it on top of "/listing/:id "     !IMPORTANT
app.get("/listing/new",(req,res)=>{  
  res.render("new")
})

app.get("/listing/:id",async (req,res)=>{
  try{
   let {id} = req.params;
   const listing = await Listing.findById(id).catch((err)=>{console.log(err)});  //
   res.render("show.ejs",{listing})
  }catch(err){
    console.log(err);
  }
   //res.render("show.ejs")
});
   
//   //  if(mongoose.Types.ObjectId.isValid(id)){
//   //    let listing = await Listing.findOne({_id:new ObjectId(id)}).then(()=>{res.render("show")})
     
     
//      //res.render("show",{listing})

//    });
  // res.send(id)
  //t = await Listing.findOne({_id:id})
  //await res.render("show",{t} )
 // const id = new mongoose.Types.ObjectId(req.params.id.trim());
  //await Listing.findOne({_id:new ObjectId(id)}).then((listing)=>{res.render("show",{listing})}).catch((err)=>{console.log(err.reason)});




  app.post("/listing",async (req,res)=>{  
    //res.send(req.body.listing)
    const tupple = new Listing(req.body.listing)
    await tupple.save();
    res.redirect("/listing");
  })