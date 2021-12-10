const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// imports routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

const PORT = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

// mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true}, () => {
//     console.log("MongoDB database connection has been established successfully.")
// })

mongoose.connect(uri, { useNewUrlParser: true});
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection has been established successfully.")
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})