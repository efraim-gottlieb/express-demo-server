import express from "express";
import * as postsController from "../controllers/postsControllers.js";
const router = express.Router();

router.route("/")
  .get(postsController.getPosts)
//   .post(postsController.addPost);

// router.route("/:id")
//   .get(postsController.getPostById)
//   .put(postsController.editPost)
//   .delete(postsController.deletePost)

export default router;
