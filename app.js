//Dependencias 
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const setUpPassport = require("./config");
const cookieParser = require("cookie-parser");

//api docs swagger
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const apiSwagger = require("./Routers/apiSwagger");

//routes
const register = require("./Routers/register");
const login = require("./Routers/login");
const listPersons = require("./Routers/listUsers");
const { use } = require("passport");

const app = express();
app.use(express.json());

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);
app.use(apiSwagger);

setUpPassport();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

app.use(
  session({
    secret: "LUp$Dg?,I#i&owP3=9su+OB%`JgL4muLF5YJ~{;t",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(register);
app.use(login);
app.use(listPersons);

module.exports.app = app;
