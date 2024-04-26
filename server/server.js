require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const storyRoute = require("./routes/stories");


const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connected!"))
    .catch((error) => console.log("DB failed to connect", error));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/story", storyRoute);

app.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "Route not found!" });
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Backend server running at port ${PORT}`);
});
