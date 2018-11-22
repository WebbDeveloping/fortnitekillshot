const express = require("express");
const session = require("express-session");
const massive = require("massive");
const bodyParser = require("body-parser");
require("dotenv").config();

const AuthCtrl = require("./controllers/Auth");
const VideoCtrl = require("./controllers/Video");

const app = express();

const { CONNECTION_STRING, SERVER_PORT: PORT, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("hell yeahhhhhhhh db connected!");
});

app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  })
);

app.post("/auth/login", AuthCtrl.login);
app.post("/auth/register", AuthCtrl.register);
app.get("/auth/logout", AuthCtrl.logout);
app.get("/auth/currentUser", AuthCtrl.getCurrentUser);

//tried to test postman. its not breaking, but undefined. i did  NOT have _url when i tried post man
//or is it suppose to be the name of my table??? wtf
app.post("/api/videos", VideoCtrl.create);
app.get("/api/videos", VideoCtrl.view);
app.get("/api/videos/:id", VideoCtrl.getVideo);
app.delete("/api/videos/:id", VideoCtrl.delete);
// app.put("/api/video_url/:id", VideoCtrl.update);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
