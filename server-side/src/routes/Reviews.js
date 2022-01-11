const express = require("express");
const router = express.Router();
const RevCon = require("../controllers/review.controller");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get("/", RevCon.findAll);

router.post("/", validateToken, RevCon.create);

router.get("/findbyId", RevCon.findById);

router.get("/findbyemployee/:id", RevCon.findByEmp);

router.get("/findbycontribution/:id", RevCon.findByCont);

router.delete("/deletebyid/:id", validateToken, RevCon.deleteById);

router.delete("/deletebyemployee/:id", RevCon.deleteByEmp);

router.delete("/deletebycontribution/:id", RevCon.deleteByCont);

router.delete("/", RevCon.deleteAll);

module.exports = router;