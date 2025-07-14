// queries.js - MongoDB queries for plp_bookstore

   // Switch to the plp_bookstore database
   use plp_bookstore

   // Task 2: Basic CRUD Operations

   // 1. Find all books in a specific genre (e.g., Fiction)
   db.books.find({ genre: "Fiction" }).pretty()

   // 2. Find books published after a certain year (e.g., 1950)
   db.books.find({ published_year: { $gt: 1950 } }).pretty()

   // 3. Find books by a specific author (e.g., George Orwell)
   db.books.find({ author: "George Orwell" }).pretty()

   // 4. Update the price of a specific book (e.g., set "The Hobbit" price to 15.99)
   db.books.updateOne(
     { title: "The Hobbit" },
     { $set: { price: 15.99 } }
   )

   // 5. Delete a book by its title (e.g., delete "Animal Farm")
   db.books.deleteOne({ title: "Animal Farm" })

   // Task 3: Advanced Queries

   // 1. Find books that are in stock and published after 2010
   db.books.find(
     { in_stock: true, published_year: { $gt: 2010 } },
     { title: 1, author: 1, price: 1, _id: 0 }
   ).pretty()

   // 2. Sort books by price (ascending)
   db.books.find(
     {},
     { title: 1, author: 1, price: 1, _id: 0 }
   ).sort({ price: 1 }).pretty()

   // 3. Sort books by price (descending)
   db.books.find(
     {},
     { title: 1, author: 1, price: 1, _id: 0 }
   ).sort({ price: -1 }).pretty()

   // 4. Pagination: First page (5 books)
   db.books.find(
     {},
     { title: 1, author: 1, price: 1, _id: 0 }
   ).limit(5).pretty()

   // 5. Pagination: Second page (5 books, skip first 5)
   db.books.find(
     {},
     { title: 1, author: 1, price: 1, _id: 0 }
   ).skip(5).limit(5).pretty()

   // Task 4: Aggregation Pipelines

   // 1. Average price of books by genre
   db.books.aggregate([
     { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
   ]).pretty()

   // 2. Author with the most books
   db.books.aggregate([
     { $group: { _id: "$author", bookCount: { $sum: 1 } } },
     { $sort: { bookCount: -1 } },
     { $limit: 1 }
   ]).pretty()

   // 3. Group books by publication decade and count
   db.books.aggregate([
     {
       $group: {
         _id: { $floor: { $divide: ["$published_year", 10] } },
         count: { $sum: 1 }
       }
     },
     { $sort: { _id: 1 } }
   ]).pretty()

   // Task 5: Indexing

   // 1. Create an index on the title field
   db.books.createIndex({ title: 1 })

   // 2. Create a compound index on author and published_year
   db.books.createIndex({ author: 1, published_year: 1 })

   // 3. Demonstrate performance with explain()
   // Query without index (run before creating index, if possible)
   db.books.find({ title: "The Hobbit" }).explain("executionStats")

   // Query with index
   db.books.find({ title: "The Hobbit" }).explain("executionStats")

   // Compound index query
   db.books.find({ author: "George Orwell", published_year: { $gt: 1940 } }).explain("executionStats")