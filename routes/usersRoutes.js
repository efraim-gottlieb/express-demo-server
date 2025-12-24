import express from "express";
import * as usersController from "../controllers/usersControllers.js";
const router = express.Router();

router.route("/")
  .get(usersController.getUsers)
  .post(usersController.addUser);

router.route("/:id")
  .get(usersController.getUserById)
  .put(usersController.editUser)
  .delete(usersController.deleteUser)

export default router;
