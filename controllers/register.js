const db = require("../routes/database");
const bcrypt = require("bcryptjs");

const register = async(req,res) =>{
    const {user, email, password:Npassword, number} = req.body; 
    console.log("in request", req.body);
    if(!user || !Npassword) return res.json({status: "error", error: "Please Enter your user name and password"});
    else{
        console.log(user);
        db.query('SELECT username FROM registrations WHERE username = ?', [user], async(err, result) => {
            if(err){
                console.log("err", err);
                return res.json({status: "error", error: "Technical error 1"});
            }
            if(result[0])return res.json({status: "error", error: "User name is already registered"})
            else{
                const password = await bcrypt.hash(Npassword, 8);
                console.log(password);
                db.query('INSERT INTO registrations SET ?', {username:user,email:email, number:number, password:password}, (error, results) => {
                    if(err){
                console.log("err", err);
                return res.json({status: "error", error: "Technical error 2"});
            }
                    return res.json({status: "success", success: "User has been registered"})
                })
            }
        })
    }
}
module.exports = register;