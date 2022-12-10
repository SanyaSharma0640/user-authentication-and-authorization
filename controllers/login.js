const jwt = require("jsonwebtoken");
const db = require("../routes/database");
const bcrypt = require("bcryptjs");

const login = async(req,res) =>{
    const{user, password} = req.body;
    console.log("in request", req.body);
    if(!user || !password) return res.json({status: "error", error: "Please Enter your user name and password"});
    else{
        db.query("SELECT * FROM registrations WHERE username = ?", [user], async(Err, result) =>{
            if(Err) throw Err;
            if(!result.length || !await bcrypt.compare(password, result[0].password)) return res.json({status: "error",
             error: "Incorrect Username or password"})
            else{
                const token = jwt.sign({ id: result[0].id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES
                })
                const cookieOptions = {
                    expiresIn: new Date(Date.now()+ process.env.COOKIE_EXPIRES*24*60*60*1000),
                    httpOnly: true
                }
                res.cookie("userRegistered", token, cookieOptions);
                return res.json({status:"success", success: "User has been logged In"});
            }
        })
    }
    //res.redirect("api/index");
}
module.exports = login;
