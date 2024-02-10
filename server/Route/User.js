const express = require('express')
const User_route = express.Router()

const { getUser } = require('../Controller/User')

User_route.get('/api/tbl/user', getUser)

module.exports = User_route