const connection = require('../Model/dbconnect');
const express = require('express')

const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json())

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//----------------------------------------- Login Post

const Login = (req, res) => {
    const userdata = {
        email: req.body.email,
        password: req.body.password
    }

    const sqlquery = 'INSERT INTO practice SET ?'
    bcrypt.hash(userdata.password, 10, (err, hash) => {
        if (err) {
            res.json(err)
        }
        const userdata2 = { ...userdata, password: hash }
        connection.query(sqlquery, userdata2, (err, result) => {
            if (err) {
                res.json(err)
            }
            else {
                res.status(200).json({
                    message: "User Registerd Successfully",
                    result: result
                })
            }
        })
    })
}

// --------------------------------------- Post compare

const LoginCompare = (req, res) => {
    email = req.body.email,
        password = req.body.password

    const sqlquery = 'select * from practice where email = ?'
    connection.query(sqlquery, [email, password], (err, result) => {
        if (err) {
            res.json(err)
        }
        bcrypt.compare(password, result[0].password, (err, ismatch) => {
            if (ismatch) {
                const token = jwt.sign({ email: result[0].email }, 'jwt-secret-Key', { expiresIn: '1d' })
                res.cookie('token', token)
                res.status(200).json({ message: 'login successfully' })
            } else {
                res.status(401).json({ err: "Password not match" })
            }
        })
    })
}

//------------------------------- GET
const getData = (req, res) => {
    return res.json({ email: req.email })
}

//--------------------------------  LogOut

const logout = (req, res) => {
    res.status(200).clearCookie('token', { sameSite: "none", secure: true }).json({ data: null, message: "Loged Out successfully" });
};

module.exports = { Login, LoginCompare, getData, logout }


// Pehle post api run karana hai Hash lagake
// Fir password ko compare karana hai =  bcrypt.compare(req.body.password.toString(), result[0].password, (err, res)=>{
// Token generate ho jayega
// Fir Verify karana hai Route me ja ke




//====================================================================================================================================

// const login = (req, res) =>{
//     Email = req.body.Email,
//     password = req.body.password

//     const sqlquery = 'select * from tbl_retailer_register where Email = ?'
//     Connection.query(sqlquery, [Email, password], (err, result) =>{
//         if(err){
//             res.json(err)
//         }
//         bcrypt.compare(password, result[0].password, (err, ismatch) =>{
//             if(ismatch) {
//                 const token = jwt.sign({ Email: result[0].Email }, 'jwt-secret-Key', { expiresIn: '1d' })
//                 res.cookie('token', token)
//                 res.status(200).json({ message: 'login successfully' })
//             } else {
//                 res.status(401).json({err:"Password not match"})
//             }
//         })
//     })
// }

// const userLogin = (req, res) => {
//     const userdata = {
//         Email: req.body.Email,
//         password: req.body.password,
//     };

//     const sqlquery = "INSERT INTO tbl_retailer_register SET ?";
//     bcrypt.hash(userdata.password, 10, (err, hash) => {
//         if (err) {
//             res.json(err)
//         }
//         const userdata2 = { ...userdata, password: hash };
//         Connection.query(sqlquery, userdata2, (err, result) => {
//             if (err) {
//                 res.json(err)
//             }
//             else {
//                 res.status(200).json({
//                     message: "User Registered Successfully",
//                     result: result,
//                 })
//             }
//         })
//     })
// }