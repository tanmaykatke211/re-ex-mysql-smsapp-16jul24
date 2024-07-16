const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const port = process.env.PORT || 9000;

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
	host: "sql12.freesqldatabase.com",
	user: "sql12720031",
	password: "4QlSYgpGDz",
	database: "sql12720031"
});

app.post("/save",(req,res) => {
	let data = [req.body.rno, req.body.name, req.body.marks];
	let sql = "insert into student values(?, ?, ?)";
	con.query(sql, data, (err, result) => {
		if (err)  	res.send(err);
		else		res.send(result);
	});	
});

app.get("/read",(req,res) => {
	let sql = "select * from student";
	con.query(sql,(err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});	
});

app.delete("/remove",(req,res) => {
	let data = [req.body.rno];
	let sql = "delete from student where rno=?";
	con.query(sql, data, (err, result) => {
		if (err)	res.send(err);
		else		res.send(result);
	});	
});

app.put("/modify",(req,res) => {
	let data = [req.body.name, req.body.marks, req.body.rno];
	let sql = "update student set name=?, marks=? where rno=?";
	con.query(sql, data, (err, result) => {
		if (err)  	res.send(err);
		else		res.send(result);
	});	
});

app.listen(port, () => {console.log("Ready @ 9000");});