const express = require("express")
const router = express.Router()
const app = express();

app.get("/",(req,res) =>{
    res.send("Devlogs Page")
  });
  
  app.get("/Videos",(req,res) =>{
    res.send("Devlogs Videos Page")
  });
  
  app.get("/Posts",(req,res) =>{
    res.send("Devlogs Post Page")
  });

module.exports = router