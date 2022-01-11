const express = require("express");
const router = express.Router();
const initCon = require("../controllers/initiative.controller");
const { validateToken } = require ("../middlewares/AuthMiddleware");

router.get("/", initCon.findAll);

router.post("/", validateToken, initCon.create);

router.get("/:id", initCon.findOne);

router.delete("/:id", initCon.delete);

router.delete("/", initCon.deleteAll);

module.exports = router;