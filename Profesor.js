class Professor extends User {
  constructor(id, name, email) {
    super(id, name, email, 'professor');
    this.registrationSessions = []; 
  }
}
