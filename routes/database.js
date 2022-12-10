const mysql=require("mysql");
const dotenv = require("dotenv").config();
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"st1_login"
});
module.exports=conn;