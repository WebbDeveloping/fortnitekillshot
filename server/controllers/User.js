module.exports = {
  updateGamertag: async (req, res) => {
    try {
      let db = req.app.get("db");
      let { gamertag, id } = req.body;

      console.log(45123, gamertag, id);
      let response = await db.updateGamertag({ gamertag, id });
      console.log(333, response);
      let updatedGamertag = response[0];
      delete updatedGamertag.hash;

      req.session.user = { ...req.session.user, ...updatedGamertag };
      console.log(444, req.session.user);
      return res.send(req.session.user);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  updateUserImage: async (request, response) => {
    try {
      let db = req.app.get("db");
      let { userImage, id } = req.body;
      console.log(55555777, response);
      let response = await db.updateUserImage({ userImage, id });
      console.log(654567, userImage);
      let updatedImage = response[0];

      req.session.user = { ...req.session.user, ...updatedImage };
      return res.send(req.session.user);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
};
