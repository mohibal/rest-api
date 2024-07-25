const express = require("express");
const router = express.Router();

const userController = require("../controllers/rest")

router.post("/", userController.post);

router.get("/", userController.getAll);

router.post("/login", userController.login);

router.get("/:userId", userController.getSingle)

router.put("/:userId", userController.update)

router.delete("/:userId", userController.deleteuser)

module.exports = router;