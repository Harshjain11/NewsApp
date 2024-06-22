const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    category:String,
    title:String,
    author:String,
   
    description:String,
    url:String,
    urlToImage:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set:(v) => v===""? "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    },
    publishedAt:String,
    content:String,

})

const news = mongoose.model("news",newsSchema);
module.exports =news;