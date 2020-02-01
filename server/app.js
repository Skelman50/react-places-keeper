const express = require("express");
const cors = require("cors");

const placesRoutes = require("./routes/places-route");
const usersRoutes = require("./routes/users-route");

const { errorHandler, notRoutes } = require("./middlewares/error-handler");

const { startApp } = require("./configs/start-application");

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use(notRoutes);

app.use(errorHandler);

const PORT = 5000;

startApp(app, PORT);
