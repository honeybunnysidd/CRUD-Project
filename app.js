const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

//express understand the client's data for all type of Request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set view engine to ejs
app.set("view engine", "ejs");

//Set path of ejs file
app.set("views", path.join(__dirname, "views"));

//set path of static file(CSS and Js)
app.use(express.static(path.join(__dirname, "public")));

let postsArr = [
  {
    id: uuidv4(),
    username: "stupid",
    content: `🚀 Turning coffee ☕ into code 💻`,
    img: "https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg",
  },
  {
    id: uuidv4(),
    username: "honey",
    content: `💡 Debugging my way through life`,
    img: "https://t3.ftcdn.net/jpg/07/13/35/82/360_F_713358254_pM12hayFvGkMbXwU1wERawwC2Tu3Mfpy.jpg",
  },
  {
    id: uuidv4(),
    username: "bunny",
    content: `📍 Full Stack | Problem Solver`,
    img: "https://img.freepik.com/premium-photo/cartoon-3d-character-developer-designer-working-laptop-web-app-development-deploy-frontend-backend-project-team-engineers-website_1029476-383431.jpg",
  },
  {
    id: uuidv4(),
    username: "sidd",
    content: `🚀 Building the future, one commit at a time`,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IUqghG_flZeaCz5Xh-vC36HXhyuOvA7n2aipof7At_3Rpc9N-rT8V1mhR0hK1RQfnkU&usqp=CAU",
  },
];

//Show all post
app.get("/posts", (req, res) => {
  res.render("index", { postsArr });
});

//Creating New Post
app.get("/posts/new", (req, res) => {
  res.render("new");
});
app.post("/posts", (req, res) => {
  let { username, content, img } = req.body;
  let id = uuidv4();
  postsArr.push({ id, username, content, img });
  res.redirect("/posts");
});

//To view a individual post
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = postsArr.find((p) => id === p.id);
  res.render("show", { post });
});

//Update the post

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = postsArr.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = postsArr.find((p) => id === p.id);
  res.render("edit", { post });
});

//Destroy the post
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  postsArr = postsArr.filter((p) => p.id !== id);
  res.redirect("/posts");
});

//Route all api
app.get("/", (req, res) => {
  res.redirect("/posts");
});
app.listen(3000, () => {
  console.log(`server is listening on 3000`);
});

// module.exports = app;
