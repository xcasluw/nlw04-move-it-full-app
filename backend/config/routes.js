const admin = require("./admin");
const multer = require("multer");
const express = require("express");

// Upload de imagem de usuários
const storageImageUsers = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/users/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploadImageUser = multer({
  storage: storageImageUsers,
  limits: { fileSize: 1000000 },
});

module.exports = (app) => {
  app.use("/uploads", express.static("uploads"));

  app.post("/signup", app.api.user.save);
  app.post("/signin", app.api.auth.signin);
  app.post("/validateToken", app.api.auth.validateToken);
  app.post("/password/forgot", app.api.password.save);
  app.post("/password/reset", app.api.password.update);


  // USERS ADMIN
  app
    .route("/users")
    .all(app.config.passport.authenticate())
    .patch(uploadImageUser.single("image"), app.api.user.changeImage)
    .post(admin(app.api.user.save))
    .get(admin(app.api.user.get));

  app
    .route("/users/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.save))
    .get(admin(app.api.user.getById))

  app
    .route("/remove-user/:id")
    .all(app.config.passport.authenticate())
    .put(admin(app.api.user.removeUser))

  // USERS OPEN
  app
    .route("/users-info")
    .all(app.config.passport.authenticate())
    .put(app.api.user.changeInfos)

};
