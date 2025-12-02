const User = require('./user');

class Professor extends User {
  constructor(id, name, email) {
    super(id, name, email, 'professor');
    this.registrationSessions = []; 
  }
}

module.exports = Professor;
