import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Xavier12345",
  database: "test",
});
db.connect((err) => {
  if (!err) console.log("database Connected...");
  else
    console.log(
      "db not connected \n Error : " + JSON.stringify(err, undefined, 2)
    );
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.get("/", (req, res) => {
  res.json("Hello,you are live from the back end!");
});

app.post("/books", (req, res) => {
  // the names of values should match those in the db columns
  const q = "INSERT INTO books (`Title`,`Desc`,`Price`,`Cover`) VALUES (?)";
  const values = [
    req.body.Title,
    req.body.Desc,
    req.body.Price,
    req.body.Cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created succefully");
  });
});
app.delete("/books/:Id", (req, res) => {
  const bookId = req.params.Id;
  const q = "DELETE FROM books WHERE Id = ? ";
  db.query(q, bookId, (err, data) => {
    if (err) return res.json(err);
    return res.json(`Book with ID ${bookId} has been deleted successfully`);
  });
});

// Edit
app.put("/books/:Id", (req, res) => {
  const bookId = req.params.Id;
  const q =
    "UPDATE books SET `Title` = ? ,`Desc` = ? ,`Price` = ? ,`Cover` = ? WHERE Id= ? ";
  const values = [
    req.body.Title,
    req.body.Desc,
    req.body.Price,
    req.body.Cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json(`Book with ID ${bookId} has been updated successfully`);
  });
});

app.listen(8800, () => {
  console.log("Connected to the backend !");
});
