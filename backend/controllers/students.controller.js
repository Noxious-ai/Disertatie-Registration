const db = require('../services/memdb');
const Student = require('../models/Student');

exports.getAll = (req, res) => {
  res.json(db.students);
};

exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const student = db.students.find(s => s.id === id);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

exports.create = (req, res) => {
  const { id, name, email } = req.body;
  const newId = id ?? db.generateId();
  const student = new Student(newId, name, email);
  db.students.push(student);
  db.users.push(student);
  res.status(201).json(student);
};
