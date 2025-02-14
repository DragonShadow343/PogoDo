import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Define the /getData route
app.get("/getData", (req, res) => {
  res.send("Hello World");
});

// Start the server
app.listen(5000, () => console.log("App is running on port 5000"));