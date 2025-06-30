/**
 * Author: Nicole Nielsen
 * Date: 6/22/2025
 * File Name: app.spec.js
 * Description: TDD Tests
 */

const request = require("supertest");
const app = require("../src/app");

// Chapter 4: API Tests

describe("Chapter 4: API Tests", () => {
  it("should return an array of books", async () => {
    const res = await request(app).get("/api/books");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("title");
  });

  it("should return a single book", async () => {
    const res = await request(app).get("/api/books/1"); // Assuming ID 1 exists
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body).toHaveProperty("title");
    expect(res.body.id).toEqual(1);
  });

  it("should return 400 if id is not a number", async () => {
    const res = await request(app).get("/api/books/war-and-peas"); // bookish pun as non-numeric test case
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/number/i);
  });

  it("should return 404 if book is not found", async () => {
    const res = await request(app).get("/api/books/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/not found/i);
  });
});

// Chapter 5: API Tests
describe("Chapter 5: API Tests", () => {
  it("should return a 201-status code when adding a new book", async () => {
    const res = await request(app).post("/api/books").send({
      id: 6,
      title: "A Court of Mist and Fury",
      author: "Sarah J. Maas",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id", 6);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("author");
  });

  it("should return a 400-status code when adding a book with missing title", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({ id: 7, author: "Anonymous" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toMatch(/title is required/i);
  });

  it("should return a 204-status code when deleting a book", async () => {
    // This test assumes the book with ID 1 exists in the default dataset
    const res = await request(app).delete("/api/books/1");
    expect(res.statusCode).toBe(204);
  });
});
