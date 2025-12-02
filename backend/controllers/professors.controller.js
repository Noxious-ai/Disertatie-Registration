const db = require('../services/memdb');
const Professor = require('../models/Profesor');

exports.getAll = (req, res) => {
  res.json(db.professors);
};

exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const professor = db.professors.find(p => p.id === id);
  if (!professor) return res.status(404).json({ message: 'Professor not found' });
  res.json(professor);
};

exports.create = (req, res) => {
  const { id, name, email } = req.body;
  const newId = id ?? db.generateId();
  const professor = new Professor(newId, name, email);
  db.professors.push(professor);
  db.users.push(professor);
  res.status(201).json(professor);
};
