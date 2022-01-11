const express = require("express");
const router = express.Router();
const empCon = require("../controllers/employee.controller");
const {validateToken} = require("../middlewares/AuthMiddleware");

router.get("/", empCon.findAll);

router.post("/register", empCon.create);

router.post("/login", empCon.login);

router.get("/:id", empCon.findOne);

router.delete("/:id", empCon.delete);

router.delete("/", empCon.deleteAll);

router.get("/validate/tokenauth", validateToken, (req, res) => {
    res.json(req.employee);
})

module.exports = router;