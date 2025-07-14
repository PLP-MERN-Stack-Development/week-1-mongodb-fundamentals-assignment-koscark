# PLP Bookstore MongoDB Project

## Setup Instructions

1. Install MongoDB Community Edition and ensure `mongod` is running on `mongodb://localhost:27017`.
2. Install Node.js and the MongoDB driver: `npm install mongodb`.
3. Run the data insertion script: `node insert_books.js`.
   4 Use MongoDB Compass or `mongosh` to verify the `plp_bookstore` database and `books` collection.
4. Run queries in `queries.js` using `mongosh`.

## Files

- `insert_books.js`: Populates the `books` collection with 12 book documents.
- `queries.js`: Contains MongoDB queries for CRUD operations, advanced queries, aggregations, and indexing.
- `books_collection_screenshot.png`: Screenshot of the `books` collection in MongoDB Compass.
