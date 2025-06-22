// Name: Niki
// Date: June 22, 2025
// File: app.js
// Description: Entry point for the In-N-Out-Books API. Sets up the Express server.

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// landing page - root route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>In-N-Out Books</title>
        <style>
          body {
            background:rgb(250, 221, 204);
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            padding: 40px;
            line-height: 1.6;
          }
          h1 {
          color:rgb(8, 1, 0);
          margin-bottom: .2em;
          }
          h2 {
          color:rgb(87, 59, 57);
          margin-top: 1.5em;
          }
          p {
          color: rgb(10, 3, 1)
          font-size: 1.2em;
          }
          ul {
          list-style-type: square;
          margin-left: 20px;
          }
          footer {
          margin-top: 2em;
          font-size: 0.9em;
          color: rgb(61, 41, 40);
          }
        </style>
      </head>
      <body>
        <h1>Welcome to In-N-Out Books!</h1>
        <p>Whether you're a collector, casual reader, or a booktok boss babe, our platform makes managing your library effortless. Add titles to your wish list, track what you've read, and never lose a great book again!</p>
        <h2> This Month's Top Sellers:</h2>
        <ul>
          <li><em>Sunrise on the Reaping (A Hunger Games Novel)</em> by Suzanne Collins</li>
          <li><em>Never Flinch</em> by Stephen King</li>
          <li><em>The Knight and the Moth</em> by Rachel Gillig</li>
        </ul>
        <h2>Hours of Operation:</h2>
        <p>Monday - Saturday: 10:00 AM - 6:00 PM<br>
        Sunday: Closed.</p>
        <h2>Contact Us</h2>
        <p> Questions, Comments, Orders? Call us at <strong>813-867-5307</strong></p>

        <footer>&copy; 2025 In-N-Out Books (Not a Burger Joint). Read Often.</footer>
      </body>
      </html>`);
});

// 404 Error Handler
app.use((req, res, next) => {
  res.status(404).send("404 Error: Page Not Found");
});

// 500 Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    ...(app.get("env") === "development" && { stack: err.stack }),
  });
});

// Export app for testing
module.exports = app;

// Fire up Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
