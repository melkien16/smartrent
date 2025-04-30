// Import the Express module
const express = require("express");

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a simple route to handle GET requests to the root
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Example of a POST route
app.post("/data", (req, res) => {
  const data = req.body;
  res.json({ message: "Data received", data });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
