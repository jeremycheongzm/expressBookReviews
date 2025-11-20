# Steps to Start Project

1. Open a new terminal and cd final_project
2. Run 'npm install', and then 'npm install axios'
3. You should see new folders node_modules and package-lock.json
4. Run 'npm start'
5. Open Postman
6. Send CRUD requests

## CRUD Requests Endpoints
GET all books
- /

GET book by ISBN
- /isbn/:isbn

GET books by author
- /author/:author
  
GET books by title
- /title/:title

GET reviews for a book
- /review/:isbn

POST register new user
- /register

POST user login
- /customer/login

PUT add a logged-in user's review
- /customer/auth/review/:isbn

DELETE delete a logged-in user's review
- /customer/auth/review/:isbn
