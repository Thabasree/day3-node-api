const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let students = [
  { roll: 101, name: "Anu", department: "CSE", age: 20 },
  { roll: 102, name: "Ravi", department: "ECE", age: 21 },
  { roll: 103, name: "Priya", department: "IT", age: 22 }
];

// READ
app.get("/", (req, res) => {
  let rows = students.map(s => `
    <tr>
      <td>${s.roll}</td>
      <td>${s.name}</td>
      <td>${s.department}</td>
      <td>${s.age}</td>
      <td>
        <a href="/edit/${s.roll}">Edit</a> |
        <a href="/delete/${s.roll}" onclick="return confirm('Delete this student?')">Delete</a>
      </td>
    </tr>
  `).join("");

  res.send(`
    <html>
      <head>
        <title>Student Dashboard</title>
        <style>
          body { font-family: Arial; background: #f4f6f8; padding: 20px; }
          h1 { text-align: center; }
          form, table { background: white; margin: auto; padding: 20px; border-radius: 8px; }
          form { width: 400px; }
          table { width: 90%; margin-top: 30px; border-collapse: collapse; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: center; }
          th { background: #3498db; color: white; }
          input, button { width: 100%; padding: 8px; margin: 5px 0; }
          button { background: #3498db; color: white; border: none; }
          a { text-decoration: none; color: #3498db; }
        </style>
      </head>
      <body>

        <h1>Student Management Dashboard</h1>

        <form method="POST" action="/add">
          <h3>Add Student</h3>
          <input name="roll" placeholder="Roll Number" required />
          <input name="name" placeholder="Name" required />
          <input name="department" placeholder="Department" required />
          <input name="age" placeholder="Age" required />
          <button>Add Student</button>
        </form>

        <table>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>Department</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
          ${rows}
        </table>

      </body>
    </html>
  `);
});

// CREATE
app.post("/add", (req, res) => {
  students.push(req.body);
  res.redirect("/");
});

// DELETE
app.get("/delete/:roll", (req, res) => {
  students = students.filter(s => s.roll != req.params.roll);
  res.redirect("/");
});

// UPDATE - FORM
app.get("/edit/:roll", (req, res) => {
  const s = students.find(st => st.roll == req.params.roll);

  res.send(`
    <html>
      <body style="font-family:Arial">
        <h2>Edit Student</h2>
        <form method="POST" action="/update">
          <input type="hidden" name="roll" value="${s.roll}" />
          <input name="name" value="${s.name}" />
          <input name="department" value="${s.department}" />
          <input name="age" value="${s.age}" />
          <button>Update</button>
        </form>
      </body>
    </html>
  `);
});

// UPDATE - LOGIC
app.post("/update", (req, res) => {
  students = students.map(s =>
    s.roll == req.body.roll ? req.body : s
  );
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});