const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true});

const blogSchema = mongoose.Schema({
  Title :String,
  Content:String
});

const Blog = new mongoose.model("Blog",blogSchema)

posts =[];
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine",'ejs');
app.use(express.static("public"));

const homeStartingContent =" This is my blog website for technology related blog the blog topic are mostly  releted to computer science engineering Your research content or any content is welcome ";
const aboutContent ="ajdfkonoifoifdnfokafjfndskmnnkfndfndsofndsokfn;okd  nfkasnf fn;ak fnklasdfn ksadfnsdndthknv   fdjhujn n iuf ifidjfn vniljvbnv b   jjb4dfi fiofdfidfhdf  hfodfdfho ih";
const contactContent = "asdlkfkd dfn;a n f klfnkdkhdjfjhdjf ifkjbd bf adkjfjfjdfhjdfhjd jdfkdjfjdfjfdf hdbhdfabfhdhehb hiahdhfbdicnbshfb  fdfdbfhdfbhdf dhfuihdfu dfi hduihfdufhdui oahofdhah fjifhiah";

app.get("/",function(req,res){
  Blog.find({},function(err,document){
    if(err){
      console.log("Something went wrong");
    }
    else{
      res.render("home.ejs",{homeContent:homeStartingContent ,postcontent:document})
    }
  });

});
app.get("/about",function(req,res){
  res.render("about.ejs",{aboutContent:aboutContent})
});
app.get("/contact",function(req,res){
  res.render("content.ejs",{contactContent:contactContent})
});

app.get("/compose",function(req,res){
  res.render("compose.ejs")
})
app.post("/compose",function(req,res){

  const post = new Blog({
    Title :req.body.blogTitle,
    Content : req.body.blogBody
  })
  post.save()
  res.redirect("/")

});

app.get("/post/:para",function(req,res){
  let parameterTitle = req.params.para;
  parameterTitle = _.lowerCase(parameterTitle);

  Blog.find({},function(err,document){

    if(err){
      console.log("Something went wrong");
    }
    else{
      posts = document;
      posts.forEach(function(post){
       let listItem = post.Title;
       listItem = _.lowerCase(listItem);
          if(parameterTitle === listItem){
           console.log("Match Found");
           res.render("post.ejs",{TitlePost:post.Title,BodyPost : post.Content})
         }
        })
    }
  })




});

app.listen(3000,function(req,res){
  console.log("working on local host 3000");
});
