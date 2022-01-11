const express = require("express");
const router = express.Router();
const ConCon = require("../controllers/contribution.controller");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", ConCon.findAll);

router.post("/", validateToken, ConCon.create);

router.get("/:id", ConCon.findOne);

router.get("/findbyemployee/:id", ConCon.findByEmp);

router.get("/findbyinitiative/:id", ConCon.findByInit);

router.delete("/deletebyid/:id", validateToken, ConCon.deleteById);

router.delete("/deletebyemployee/:id", ConCon.deleteByEmp);

router.delete("/deletebyinitiative/:id", ConCon.deleteByInit);

router.delete("/", ConCon.deleteAll);

module.exports = router;