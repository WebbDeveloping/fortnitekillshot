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
      let user_id = req.session.user.id;

      console.log(45454545, user_id, req.session.user);
      let videos = await db.deleteVideo([+id, user_id]);
      console.log(45678, videos);
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

      let videoResponse = await db.getVideo([+id]);
      // let video = videoResponse[0];

      res.send(videoResponse);
    } catch (error) {
      console.log("error getting video:", error);
      res.status(500).send(error);
    }
  },

  getVideoInfo: async (req, res) => {
    try {
      const db = req.app.get("db");
      let { id } = req.params;

      let videoResponse = await db.getVideoInfo([+id]);
      let video = videoResponse[0];

      res.send(video);
    } catch (error) {
      console.log("error getting video:", error);
      res.status(500).send(error);
    }
  }
};
