/**
 * Author: Nicole Nielsen
 * Date: 6/22/2025
 * File Name: app.js
 * Description: Assignment 4.2
 */

const express = require("express");
const books = require("../database/books");
const app = express();

app.use(express.json());

// GET all books
app.get("/api/books", async (req, res) => {
  try {
    const allBooks = await books.find();
    res.status(200).json(allBooks);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// GET a single book by ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Book ID must be a number" });
    }

    const book = await books.findOne({ id }).catch(() => null);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = app;
