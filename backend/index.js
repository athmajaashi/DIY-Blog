import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abcdefghij",
    database:"DIYBlog"
})

app.use(express.json())

app.get("/", (req, res) => {
    res.json("hello");
  });
  
  app.get("/blogs", (req, res) => {
    const q = "SELECT * FROM blogs";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.get("/blogs/:id", (req, res) => {
    const blogId=req.params.id;
    const q = "SELECT * FROM blogs WHERE id =?";

    db.query(q,[blogId], (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });

  app.post("/new", (req,res)=>{
    const q = "INSERT INTO blogs (`title`,`author`, `body`, `coverImg`, `bodyImg`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.author,
        req.body.body,
        req.body.coverImg,
        req.body.bodyImg,
    ]

    db.query (q,[values], (err,data)=>{
        if (err) return res.json(err);
        return res.json("blog has been created successfully");
    });
});

app.delete("/blogs/:id",(req,res)=>{
    const blogId=req.params.id;
    const q="DELETE FROM blogs WHERE id =?";
  
    db.query (q,[blogId], (err,data)=>{
        if (err) return res.send(err);
        return res.json("Blog has been deleted successfully!");
    });
  });

  app.put("/blogs/:id", (req, res) => {
    const blogId = req.params.id;
    const q = "UPDATE blogs SET `title`= ?, `author`= ?, `body`= ?, `coverImg`=?, `bodyImg`=? WHERE id  = ?";
  
    const values = [
      req.body.title,
      req.body.author,
      req.body.body,
      req.body.coverImg,
      req.body.bodyImg,
  ]
  
    db.query(q, [...values,blogId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8000, () =>{
    console.log("Connected to backend!")
})