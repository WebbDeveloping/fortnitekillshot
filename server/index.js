const express = require("express");
const session = require("express-session");
const massive = require("massive");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const bluebird = require("bluebird");
const multiparty = require("multiparty");
// const path = require("path");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
AWS.config.setPromisesDependency(bluebird);

const s3 = new AWS.S3();

const AuthCtrl = require("./controllers/Auth");
const VideoCtrl = require("./controllers/Video");

const app = express();

const { CONNECTION_STRING, SERVER_PORT: PORT, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
  console.log("hell yeahhhhhhhh db connected!");
});

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
  })
);
// app.use(
//   "/s3",
//   require("react-s3-uploader/s3router")({
//     bucket: "fortnitekillshot",

//     signatureVersion: "v4", //optional (use for some amazon regions: frankfurt and others)
//     headers: { "Access-Control-Allow-Origin": "*" }, // optional
//     ACL: "private", // this is default
//     uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
//   })
// );
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,

    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

app.post("/auth/login", AuthCtrl.login);
app.post("/auth/register", AuthCtrl.register);
app.get("/auth/logout", AuthCtrl.logout);
app.get("/auth/currentUser", AuthCtrl.getCurrentUser);

app.post("/api/videos", (request, response) => {
  const db = request.app.get("db");
  let user_id = request.session.user.id;
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;

      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `fortnitekillshot/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      let videos = await db.createVideo({ user_id, video_url: data.Location });

      return response.status(200).send(videos);
    } catch (error) {
      console.log(error);
      return response.status(400).send(error);
    }
  });
});

// app.get('https://fortnite-public-api.theapinetwork.com/prod09/store/get', )
app.get("/api/videos", VideoCtrl.view);
app.get("/api/videos/:id", VideoCtrl.getVideo);
app.get("/api/videos/info/:id", VideoCtrl.getVideoInfo);
app.delete("/api/videos/:id", VideoCtrl.delete);
// app.put("/api/video_url/:id", VideoCtrl.update);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
