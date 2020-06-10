const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const expressValidator = require("express-validator");

require("dotenv").config();

// import routes

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const studentClassRoutes = require("./routes/studentClass");
const subjectRoutes = require("./routes/subject");
const schoolInfoRoutes = require("./routes/schoolInfo");
const emailRoutes = require("./routes/email");
const resultRoutes = require("./routes/result");


// app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB Connected"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


// routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", studentClassRoutes);
app.use("/api", subjectRoutes);
app.use("/api", schoolInfoRoutes);
app.use("/api", emailRoutes);
app.use("/api", resultRoutes);


const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
