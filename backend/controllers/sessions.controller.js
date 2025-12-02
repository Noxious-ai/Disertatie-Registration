const db = require('../services/memdb');
const RegistrationSession = require('../models/RegistrationSession');

exports.getAll = (req, res) => {
  res.json(db.sessions);
};

exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const session = db.sessions.find(s => s.id === id);
  if (!session) return res.status(404).json({ message: 'Session not found' });
  res.json(session);
};

exports.create = (req, res) => {
  const { id, professorId, startDate, endDate, maxApprovedStudents } = req.body;
  const newId = id ?? db.generateId();

  const professor = db.professors.find(p => p.id === professorId);
  if (!professor) {
    return res.status(400).json({ message: 'Professor not found for professorId' });
  }

  const session = new RegistrationSession(newId, professorId, startDate, endDate, maxApprovedStudents);

  // verificam suprapunerea cu alte sesiuni ale aceluiasi profesor
  const overlaps = db.sessions.some(
    s => s.professorId === professorId && session.overlapsWith(s)
  );
  if (overlaps) {
    return res.status(400).json({ message: 'Session overlaps with existing session for this professor' });
  }

  db.sessions.push(session);
  professor.registrationSessions.push(session);

  res.status(201).json(session);
};
