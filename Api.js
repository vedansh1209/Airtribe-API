const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'airtribedb'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database');
    return;
  }
  console.log('Connected to MySQL database');
});

const app = express();
app.use(bodyParser.json());

// Create course API
app.post('/courses', (req, res) => {
  const { name, max_seats, start_date, instructor_id } = req.body;
  const query = 'INSERT INTO courses (name, max_seats, start_date, instructor_id) VALUES (?, ?, ?, ?)';
  db.query(query, [name, max_seats, start_date, instructor_id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json({ id: result.insertId, name, max_seats, start_date, instructor_id });
  });
});

// Update course details API
app.put('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const { name, max_seats, start_date } = req.body;
  const query = 'UPDATE courses SET name = ?, max_seats = ?, start_date = ? WHERE id = ?';
  db.query(query, [name, max_seats, start_date, courseId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json({ id: courseId, name, max_seats, start_date });
  });
});

// Course registration API
app.post('/leads', (req, res) => {
  const { course_id, name, email, phone_number, linkedin_profile } = req.body;
  const query = 'INSERT INTO leads (course_id, name, email, phone_number, linkedin_profile) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [course_id, name, email, phone_number, linkedin_profile], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json({ id: result.insertId, course_id, name, email, phone_number, linkedin_profile });
  });
});

// Lead update API
app.put('/leads/:id', (req, res) => {
  const leadId = req.params.id;
  const { status } = req.body;
  const query = 'UPDATE leads SET status = ? WHERE id = ?';
  db.query(query, [status, leadId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json({ id: leadId, status });
  });
});

// Lead search API
app.get('/leads', (req, res) => {
  const { name, email } = req.query;
  let query = 'SELECT * FROM leads';
  const params = [];
  if (name) {
    query += ' WHERE name = ?';
    params.push(name);
  }
  if (email) {
    query += params.length ? ' AND' : ' WHERE';
    query += ' email = ?';
    params.push(email);
  }
  db.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
