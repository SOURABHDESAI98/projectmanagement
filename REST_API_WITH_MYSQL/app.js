//flow  => service->controller->router->app.js
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');//cors



app.use(cors({
    origin:"http://localhost:3001"
}));//to allow access to this particular frontend api


const projectRouter = require("./api/projects/router");

app.use(express.json());// to convert into js object

app.use("/api/projects", projectRouter);
app.listen(process.env.APP_PORT, () => {
    console.log("server up and running :", process.env.APP_PORT);
});