const express = require("express");
const apiControll = require("../Controller/apiController");
const apiSwagger = express.Router();

apiSwagger.post("/api/register", apiControll.apiRegisterUser);
apiSwagger.delete("/api/delete/:email", apiControll.apiDelete);

module.exports = apiSwagger;