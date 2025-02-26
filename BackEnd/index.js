import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ 
  origin: "http://localhost:5173" ,
  credentials: true
  }));
app.use(express.json());

// Define the /getData route
app.get("/getData", (req, res) => {
  res.json({message: "Hello World"});
});

// Start the server
const PORT = 3500;
app.listen(PORT, () => console.log("App is running on port 3500"));