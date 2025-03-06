const express = require("express");
const path = require("path");
const app = express();

//express understand the client's data for all type of Request
app.use(express.urlencoded({ extended: true }));

//Set view engine to ejs
app.set("view engine", "ejs");

//Set path of ejs file
app.set("views", path.join(__dirname, "views"));

//set path of static file(CSS and Js)
app.use(express.static(path.join(__dirname, "public")));

let postsArr = [
  {
    username: "stupid",
    content: `🚀 Turning coffee ☕ into code 💻`,
    img: "https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg",
  },
  {
    username: "honey",
    content: `💡 Debugging my way through life`,
    img: "https://t3.ftcdn.net/jpg/07/13/35/82/360_F_713358254_pM12hayFvGkMbXwU1wERawwC2Tu3Mfpy.jpg",
  },
  {
    username: "bunny",
    content: `📍 Full Stack | Problem Solver`,
    img: "https://img.freepik.com/premium-photo/cartoon-3d-character-developer-designer-working-laptop-web-app-development-deploy-frontend-backend-project-team-engineers-website_1029476-383431.jpg",
  },
  {
    username: "sidd",
    content: `🚀 Building the future, one commit at a time`,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IUqghG_flZeaCz5Xh-vC36HXhyuOvA7n2aipof7At_3Rpc9N-rT8V1mhR0hK1RQfnkU&usqp=CAU",
  },
];

app.listen(3000, () => {
  console.log(`server is listening on 3000`);
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { postsArr });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});
app.post("/posts", (req, res) => {
  let { username, content, img } = req.body;
  postsArr.push({ username, content,img });
  res.redirect("/posts");
});
