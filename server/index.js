const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookies = require("cookie-parser")
dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);


app.use(cookies())
const getUser = require('./Route/User')
app.use('/', getUser)

const Login = require("./Route/Login")
app.use('/', Login)


const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on ${port} Port`);
});