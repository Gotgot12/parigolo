import express from "express";
import bodyParser from "body-parser";

const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Existing route
app.get("/", (req, res) => {
  res.send("<h1>Hello, Express.js Server!</h1>");
});

// New route for creating a betting room
app.post("/rooms", (req, res) => {
  const roomName = req.body.name;
  // Here you can handle the room creation
  console.log(`Room "${roomName}" has been created.`);
  res.status(201).json({ message: `Room "${roomName}" has been created.` });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});