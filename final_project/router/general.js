const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

async function fetchBooksBy(field, value) {
  const keys = Object.keys(books);
  let result = [];
  for (let key of keys) {
    if (books[key][field] === value) {
      result.push(books[key]);
    }
  }
  if (result.length === 0) {
    throw new Error(`No books found for ${field}: ${value}`);
  }
  return result;
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(409).json({ error: "Username already exists" });
  }
  users.push({ username, password });
  return res.status(201).json({ message: "User successfully registered" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  try {
    const result = await fetchBooksBy('isbn', Number(isbn));
    return res.send(JSON.stringify(result[0], null, 2));
  } catch (err) {
    return res.status(404).send(JSON.stringify({ error: "Book not found" }, null, 2));
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  const author = req.params.author;
  try {
    const result = await fetchBooksBy('author', author);
    return res.send(JSON.stringify(result, null, 2));
  } catch (err) {
    return res.status(404).send(JSON.stringify({ error: err.message }, null, 2));
  }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  //Write your code here
  const title = req.params.title;
  try {
    const result = await fetchBooksBy('title', title);
    return res.send(JSON.stringify(result, null, 2));
  } catch (err) {
    return res.status(404).send(JSON.stringify({ error: err.message }, null, 2));
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if (books[isbn]) {
    const response = {
      title: books[isbn].title,
      reviews: books[isbn].reviews
    };

    return res.send(JSON.stringify(response, null, 2));
  } else {
    return res
      .status(404)
      .send(JSON.stringify({ error: "Book not found" }, null, 2));
  }
});

module.exports.general = public_users;
