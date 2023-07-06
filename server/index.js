import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"; // for mongoDB access
import cors from "cors"; // for making cross-version request
import dotenv from "dotenv"; // to use env files (enviourment variable)
import multer from "multer"; // to upload the files locally
import helmet from "helmet"; // use to secure http headers / safety
import morgan from "morgan"; // mainly a middleware used for login 

//to configure path of directories
import path from "path";
import { fileURLToPath } from "url";



import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


/* CONFIGURATIONS */
//Gives File System path of current module
const __filename = fileURLToPath(import.meta.url);
//Directory path of current module
const __dirname = path.dirname(__filename);
dotenv.config();
// invoke express
const app = express();
app.use(express.json());
app.use(helmet()); // invoked

// Enable Cross-Origin Resource Sharing (CORS) policy to allow cross-origin requests
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Enable logging of HTTP requests using the "common" format
app.use(morgan("common"));

// Parse incoming requests with JSON payloads and set limit and extended options
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Parse incoming requests with URL-encoded payloads and set limit and extended options
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// invoke cross origin resource sharing
app.use(cors());

// set the directory where we keep the assets
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); 
mongoose.set('strictQuery', true);

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
