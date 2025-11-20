const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.send(JSON.stringify(books, null, 2));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn], null, 2));
  } else {
    return res.status(404).send(JSON.stringify({ error: "Book not found"}, null, 2))
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const keys = Object.keys(books);
  let result = [];

  for (let key of keys) {
    if (books[key].author === author) {
      result.push(books[key]);
    }
  }
  if (result.length === 0) {
    return res.status(404).send(JSON.stringify({ error: "No books found for this author"}, null, 2));
  }
  return res.send(JSON.stringify(result, null, 2));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const keys = Object.keys(books);
  let result = [];

  for (let key of keys){
    if (books[key].title === title){
      result.push(books[key]);
    }
  }
  if (result.length === 0){
    return res.status(404).send(JSON.stringify({ error: "No title"}, null, 2));
  }
  return res.send(JSON.stringify(result, null, 2));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.send(JSON.stringify(books[isbn].reviews, null, 2));
  } else {
    return res.status(404).send(JSON.stringify({ error: "Book not found" }, null, 2));
  } 
});

module.exports.general = public_users;
