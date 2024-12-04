const { Router } = require("express");
const passport = require("passport");

const postsRouter = Router();
const postsController = require("../controllers/postsController");

postsRouter.get("/", postsController.allpublicpostsGet);
postsRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  postsController.allpostsGet
);
postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsController.postsPost
);
postsRouter.get("/:id", postsController.postsGet);
postsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.postsPut
);
postsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postsController.postsDelete
);

postsRouter.get("/:id/comments", postsController.commentsGet);
postsRouter.post("/:id/comments", postsController.commentsPost);
postsRouter.delete("/comments/:id", postsController.commentsDelete);

module.exports = postsRouter;
