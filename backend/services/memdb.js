const User = require('../models/user');
const Student = require('../models/Student');
const Professor = require('../models/Profesor');
const RegistrationSession = require('../models/RegistrationSession');
const PreliminaryApplication = require('../models/PreliminaryApplication');

// simpla "baza de date" in memorie
const db = {
  users: [],
  students: [],
  professors: [],
  sessions: [],
  applications: [],
  _nextId: 1,
  generateId() {
    return this._nextId++;
  }
};

module.exports = db;
