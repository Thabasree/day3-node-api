const express = require("express");
const app = express();

// Student data
const students = [
  { id: 1, name: "Karthika", dept: "CSE", age: 20 },
  { id: 2, name: "Saranya", dept: "ECE", age: 21 },
  { id: 3, name: "Ramesh", dept: "IT", age: 22 }
];

// Route to display table
app.get("/students", (req, res) => {
  let table = `
    <h2 style="text-align:center">Student Details</h2>
    <table border="1" cellpadding="10" cellspacing="0" style="margin:auto">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Department</th>
        <th>Age</th>
      </tr>`;

  students.forEach(s => {
    table += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.dept}</td>
        <td>${s.age}</td>
      </tr>`;
  });

  table += `</table>`;
  res.send(table);
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("Open http://localhost:3000/students");
});