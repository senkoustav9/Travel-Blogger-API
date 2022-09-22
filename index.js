const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

// .env file configuration
const dotenv = require("dotenv");
dotenv.config();

// routers
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");

// DB Configuration
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,        
    useUnifiedTopology: true,     
  })
  .then(console.log(`DB GOT CONNECTED`))
  .catch((error) => {
    console.log(`DB CONNECTION ISSUES`);
    console.log(error);
    process.exit(1);
  });

// declaring app
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")));

// for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

// starting the server
app.listen("5000", () => {
  console.log("App running on port 5000");
});