const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("index");
})
router.get("/login", (req, res)=>{
    res.render("login.ejs", {root: "./public/"});
})
router.get("/register", (req, res)=>{
    res.render("register.ejs", {root: "./public"});
})

module.exports = router;