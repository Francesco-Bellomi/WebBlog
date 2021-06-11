const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");


let app = express();
const newPosts = [];
app.use(express.urlencoded({
    extended: true,
}))

app.set("view engine", "ejs");

app.use(express.static("public"));

const homeStartingContent = " HOME Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper neque vitae tempus quam. Sit amet luctus venenatis. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio un vitae. Mauris ultrice eros in cursus turpis massa tincidunt dui."

const aboutContent = " ABOUT US Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper neque vitae tempus quam. Sit amet luctus venenatis. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio un vitae. Mauris ultrice eros in cursus turpis massa tincidunt dui."

const contactContent = " CONTACT US Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper neque vitae tempus quam. Sit amet luctus venenatis. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio un vitae. Mauris ultrice eros in cursus turpis massa tincidunt dui."



app.get("/", function(req, res) {

    res.render("home", {
        homeStart: homeStartingContent,
        newPosts: newPosts
    });
})

app.get("/about", function(req, res) {
    res.render("about", {
        aboutUs: aboutContent,
    })
})

app.get("/contact", function(req, res) {
    res.render("contact", {
        contactUs: contactContent,
    })
})

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {

    const post = {
        title: req.body.title,
        content: req.body.content
    }
    newPosts.push(post);

    res.redirect("/");

})

app.get("/post/:postName", function(req, res) {
    const reqTitle = req.params.postName;
    newPosts.forEach((post) => {
        const storedTitle = post.title;
        if (_.lowerCase(storedTitle) === _.lowerCase(reqTitle)) {
            res.render("post", {
                title: post.title,
                content: post.content
            })
        }
    })

})


app.listen(3000, function() {
    console.log("hello 3000");
})