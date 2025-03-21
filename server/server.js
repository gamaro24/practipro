// Database connection
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./database/database");
//Routes
const UserRouter = require("./routes/UserRouter");
const UserModel = require("./models/UserModel");

const RoleRouter = require("./routes/RoleRouter");
const RoleModel = require("./models/RoleModel");

const UniversityRouter = require("./routes/UniversityRouter");
const UniversityModel = require("./models/UniversityModel");

const InstitutionRouter = require("./routes/InstitutionRouter");
const InstitutionModel = require("./models/InstitutionModel");

const CarrerRouter = require("./routes/CarrerRouter");
const CarrerModel = require("./models/CarrerModel");

const HourRouter = require("./routes/HourRouter");
const HourModel = require("./models/HourModel");

const AssistRouter = require("./routes/AssistRouter");
const AssistModel = require("./models/AssistModel");

const CycleRouter = require("./routes/CycleRouter");
const CycleModel = require("./models/CycleModel");

const EvaluationRouter = require("./routes/EvaluationRouter");
const EvaluationModel = require("./models/EvaluationModel");

// Models
require("./models/UserModel");

dotenv.config({ path: "./.env" });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


const API_PORT = process.env.API_PORT;
const PORT = process.env.PORT || API_PORT;

// The app listen to PORT
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

//URL ROUTES
app.use("/api/user/", UserRouter);
app.use("/api/roles/", RoleRouter);
app.use("/api/universities/", UniversityRouter);
app.use("/api/carrer/", CarrerRouter);
app.use("/api/institution/", InstitutionRouter);
app.use("/api/hour/", HourRouter);
app.use("/api/assist/", AssistRouter);
app.use("/api/cycle/", CycleRouter);
app.use("/api/evaluation/", EvaluationRouter);


app.use("*", (req, res) => {
  return res.status(504).send({
    msg: "Fallo en el servidor",
  });
});

//SYNC -> sync with the database, if the model matches the table.
//add alter:true inside sync to force alteration of model with db 
//db.sync({alter:true})
db.sync()
  .then(() => {

    console.log("Database connected...");
  })
  .catch((error) => {
    console.log(error);
  });
