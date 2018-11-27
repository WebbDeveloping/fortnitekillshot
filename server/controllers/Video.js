//anything thst was getVideo is now GetUserVideo

module.exports = {
  // create: async (req, res) => {
  //   try {
  //     const db = req.app.get("db");
  //     console.log(req.body, req.session);
  //     let { video_url } = req.body;
  //     let user_id = req.session.user.id;

  //     let videos = await db.createVideo({ user_id, video_url });

  //     res.send(videos);
  //   } catch (error) {
  //     console.log("error submiting video:", error);
  //     res.status(500).send(error);
  //   }
  // },
  view: async (req, res) => {
    try {
      const db = req.app.get("db");

      let videos = await db.getVideos();
      res.send(videos);
    } catch (error) {
      console.log("error fetching videos:", error);
      res.status(500).send(error);
    }
  },
  //   update: async (req, res) => {
  //     try {
  //       const db = req.app.get("db");
  //       let { id } = req.params;
  //       let { video_url } = req.body;
  //       let videos = await db.updateVideo([id, video_url]);

  //       res.send(videos);
  //     } catch (error) {
  //       console.log("error updating video:", error);
  //       res.status(500).send(error);
  //     }
  //   },
  delete: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { id } = req.params;

      let videos = await db.deleteVideo(id);
      //not id. not [+id]. not video.id..... what the fuck do i put here!!!???!!!
      console.log(887788, videos);
      res.send(videos);
    } catch (error) {
      console.log("error deleting video:", error);
      res.status(500).send(error);
    }
  },
  getVideo: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { id } = req.params;
      // what is the diference between id and [+id]???
      let videoResponse = await db.getVideo([+id]);
      // let video = videoResponse[0];

      res.send(videoResponse);
      console.log("vr", videoResponse);
    } catch (error) {
      console.log("error getting video:", error);
      res.status(500).send(error);
    }
  }
};
