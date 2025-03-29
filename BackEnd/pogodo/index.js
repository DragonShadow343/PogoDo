import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ 
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


app.get("/getData", (req, res) => {
  res.json({ message: "Hello World" });
});


const PORT = 3501; // Changed to 3501
app.listen(PORT, () => console.log("App is running on port 3501"));