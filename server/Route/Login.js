const express = require('express')
const Login_route = express.Router()
const jwt = require('jsonwebtoken')

//------------------------------------    
const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    console.log(token)
    if (!token) {
        return res.status(401).json({Error: "You are not Authenticated"})
    }
    else {
        jwt.verify(token, 'jwt-secret-Key', (err, decoded) => {
            if (err) res.status(401).json({Error: "Token Wrong"})
            req.email = decoded.email
            next();
        })
    }
} 

//-----------------------------------

const { Login, LoginCompare, getData, logout } = require('../Controller/Login')

Login_route.post('/Login/user', Login)
Login_route.post('/Login/post', LoginCompare)
Login_route.get('/api/login/getdata', verifyUser, getData)

Login_route.get('/api/Login/Logout', logout )

module.exports = Login_route