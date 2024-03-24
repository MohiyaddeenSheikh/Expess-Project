//express----------------------------------
const express = require("express");
const app =  express();

app.listen(3000, ()=>{console.log("listening on 3000 sucessfully..!")})


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
  const tupple1 = new Listing({
    title:"Mehak Hotel",
    description:"very luxirious and pleasent hotel.",
    price:5000,
    location: "Noida, sector 62",
    country:"India"
  })
  await tupple1.save().then((r)=>{res.render("index",{r})})
})
