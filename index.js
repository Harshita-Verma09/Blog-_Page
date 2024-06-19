const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // for express clearly  understand frontend data.
app.use(methodOverride('_method'));


let articles = [
    {   
        id: uuidv4(),
        username: "Tinduck verma",
        content: "Microsoft to hire real-estate lawyers in each State",
        contact: "tindick@gmail.com",
    },
    {   
        id: uuidv4(),
        username: "Vaibhav verma",
        content: " Five killed as fire breaks out in residential building in Ghaziabad",
        contact: "vaibhav@gmail.com",
    },
    {   
        id: uuidv4(),
        username: "Bunty verma",
        content: " Court reserves order on taking cognisance on ED chargesheet against Kejriwal ",
        contact: "bunty@gmail.com",
    },
];

app.get("/articles", (req, res) => {
    res.render("index.ejs", {articles});
});

app.get("/articles/new",(req, res)=>{
   res.render("new.ejs");
});


app.post("/articles", (req,res)=>{ //add new data on array.........
    let { username, content, contact } = req.body;
    let id = uuidv4();
    articles.push({id,  username, content, contact });
    res.redirect("/articles");
});

app.get("/articles/:id",(req,res)=>{
    let {id} = req.params;
    let article = articles.find((a) => id === a.id);
    res.render("show.ejs",{ article});
});


app.patch("/articles/:id",(req, res)=>{ //update route.....
    let {id} = req.params;
    let newContent = req.body.content;
    let article = articles.find((a) => id === a.id);
    article.content = newContent;
    console.log(newContent);
    console.log(id);
    res.redirect("/articles" );
});


app.get("/articles/:id/edit", (req, res)=>{ //edit route
    let {id} = req.params;
    let article = articles.find((a) => id === a.id);
    res.render("edit.ejs",{article});

});

app.delete("/articles/:id",(req,res)=>{
    let {id} = req.params;
    articles = articles.filter((a) => id !== a.id); //provide post info..
    res.redirect("/articles" );
});

app.listen(port, () => {
    console.log("Listen to port: 8080");
});