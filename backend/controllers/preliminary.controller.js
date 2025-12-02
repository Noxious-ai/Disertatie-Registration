const db = require('../services/memdb');
const PreliminaryApplication = require('../models/PreliminaryApplication');

exports.getAll = (req, res) => {
  res.json(db.applications);
};

exports.getById = (req, res) => {
  const id = parseInt(req.params.id);
  const app = db.applications.find(a => a.id === id);
  if (!app) return res.status(404).json({ message: 'Application not found' });
  res.json(app);
};

exports.create = (req, res) => {
  const { id, studentId, professorId, sessionId } = req.body;

  const student = db.students.find(s => s.id === studentId);
  if (!student) return res.status(400).json({ message: 'Student not found for studentId' });

  const professor = db.professors.find(p => p.id === professorId);
  if (!professor) return res.status(400).json({ message: 'Professor not found for professorId' });

  const session = db.sessions.find(s => s.id === sessionId);
  if (!session) return res.status(400).json({ message: 'Session not found for sessionId' });

  if (session.getApprovedCount() >= session.maxApprovedStudents) {
    return res.status(400).json({ message: 'Maximum approved students reached for this session' });
  }

  const newId = id ?? db.generateId();
  const application = new PreliminaryApplication(newId, studentId, professorId, sessionId);

  db.applications.push(application);
  student.applications.push(application);
  session.applications.push(application);

  res.status(201).json(application);
};

exports.approve = (req, res) => {
  const id = parseInt(req.params.id);
  const app = db.applications.find(a => a.id === id);
  if (!app) return res.status(404).json({ message: 'Application not found' });

  const session = db.sessions.find(s => s.id === app.sessionId);
  if (!session) return res.status(400).json({ message: 'Session not found for application' });

  if (session.getApprovedCount() >= session.maxApprovedStudents) {
    return res.status(400).json({ message: 'Maximum approved students reached for this session' });
  }

  app.approve();
  res.json(app);
};

exports.reject = (req, res) => {
  const id = parseInt(req.params.id);
  const app = db.applications.find(a => a.id === id);
  if (!app) return res.status(404).json({ message: 'Application not found' });

  const { reason } = req.body;
  app.reject(reason || 'No reason provided');
  res.json(app);
};

exports.remove = (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.applications.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ message: 'Application not found' });

  const [removed] = db.applications.splice(index, 1);

  // sterge din student & session
  const student = db.students.find(s => s.id === removed.studentId);
  if (student) {
    student.applications = student.applications.filter(a => a.id !== removed.id);
  }
  const session = db.sessions.find(s => s.id === removed.sessionId);
  if (session) {
    session.applications = session.applications.filter(a => a.id !== removed.id);
  }

  res.json({ message: 'Deleted', application: removed });
};
