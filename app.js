require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const news=require("./models/news.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");





// connecting to DB  
const MONGO_URL= process.env.MONGO_URI ;
main().then(() => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err);
});


async function main() {
    console.log(MONGO_URL);
    await mongoose.connect(MONGO_URL);
  }

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//   calling API 

app.get("/", (req,res) => {
     
    res.send("hi, I am root, got to '/news' to see the website ");
});




// show route  
app.get("/news",async (req,res) => {
    const allNews = await news.find({});
    res.render("news/index.ejs",{ allNews })

});
// new route 
app.get("/news/new",(req,res) => {
    res.render("news/new.ejs");
})
// show each news in detail  
app.get("/news/:id",async (req,res) => {
 let {id} =req.params;

 const nws = await news.findById(id);
 res.render("news/show.ejs",{ nws });
 
})
//category search
app.get("/news/quick/:cat",async (req,res) => {
       
    let {cat} = req.params;
   
    let  allNews =await news.find({});
    
    allNews =  allNews.filter((ele) =>  ele.category == cat); 
    
    res.render("news/index.ejs",{allNews});
})
// create route 
app.post("/news",async (req,res) => {
    // let {category,author,title,description,urlToImage,content} = req.body;
    let newNews =  new news(req.body.news);
    await newNews.save();
    res.redirect("/news");

})
//edit route
app.get("/news/:id/edit",async (req,res) => {
    let {id} =req.params;
    const nws = await news.findById(id);
    res.render("news/edit.ejs" ,{ nws });
})
//put route
app.put("/news/:id", async (req,res) => {
    let {id} =req.params;
   await news.findByIdAndUpdate(id,{...req.body.news})
    res.redirect(`/news/${id}`);
})
//delete route
app.delete("/news/:id",async (req,res) => {
    let {id} =req.params;
   let deletedNews = await news.findByIdAndDelete(id);
   console.log(deletedNews);
   res.redirect("/news");
})

// listening to server 
app.listen(8080,() => {
    console.log("server is listening on port 8080");
})