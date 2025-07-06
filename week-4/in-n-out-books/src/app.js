/**
 * Author: Nicole Nielsen
 * Date: 6/22/2025 | 07/06/2025
 * File Name: app.js
 * Description: Assignment 4.2
 * Contains updates for week 6 assignment
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

// POST a new book
app.post("/api/books", async (req, res) => {
  try {
    const { id, title, author } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required." });
    }

    const newBook = { id, title, author };
    await books.insertOne(newBook);

    res.status(201).json(newBook);
  } catch (err) {
    console.error("POST /api/books error:", err);
    res.status(500).json({ error: "Could not add the book." });
  }
});

// DELETE a book by ID
app.delete("/api/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await books.deleteOne({ id });
    res.status(204).send();
  } catch (err) {
    console.error("DELETE /api/books/:id error:", err);
    res.status(500).json({ error: "Could not delete the book." });
  }
});

// PUT update a book by ID
app.put("/api/books/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Input must be a number" });
    }

    const { title, author } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const book = await books.findOne({ id }).catch(() => null);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await books.updateOne({ id }, { title, author });
    res.status(204).send();
  } catch (err) {
    console.error("PUT /api/books/:id error:", err);
    res.status(500).json({ error: "Could not update the book" });
  }
});

module.exports = app;
