const express = require("express");
const router = express.Router();
const SubCon = require("../controllers/subscription.controller");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", SubCon.findAll);

router.post("/", validateToken, SubCon.create);

router.get("/findbyemployee/:id", SubCon.findByEmp);

router.get("/findbyinitiative/:id", SubCon.findByInit);

router.delete("/deletebyid/:id", SubCon.deleteById);

router.delete("/deletebyemployee/:id", SubCon.deleteByEmp);

router.delete("/deletebyinitiative/:id", SubCon.deleteByInit);

router.delete("/", SubCon.deleteAll);

module.exports = router;