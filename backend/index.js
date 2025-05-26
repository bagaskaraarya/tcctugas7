import express from "express";
import cors from "cors";
import noteRoute from "./routes/NoteRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

dotenv.config();

app.use(cookieParser());
app.use(cors({
  origin: 'https://backendnotes-176-772045342482.us-central1.run.app',
  credentials: true,
}));
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(noteRoute);

app.listen(5000, () => console.log("Connected to server"));