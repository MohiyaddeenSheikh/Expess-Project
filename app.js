//express----------------------------------
const express = require("express");
const app =  express();

app.listen(3002, ()=>{console.log("listening on 3002 sucessfully..!")})


//ejs-------------------------------------
const ejsMate = require("ejs-mate");
app.engine('ejs',ejsMate);
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
});
   
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
app.put("/listing/:id",async (req,res)=>{
  const {id} = req.params;
  //const reconstructedListing =  
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect("/listing");
})

app.delete("/listing/:id",async(req,res)=>{
  const {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listing");  
});


app.get("/listing/:id/edit",async (req,res)=>{
  const result = await Listing.findById(req.params.id);
  res.render("edit",{result})
});


  app.post("/listing",async (req,res)=>{  
    //res.send(req.body.listing)
    const tupple = new Listing(req.body.listing)
    await tupple.save();
    res.redirect("/listing");
  })