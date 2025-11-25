class RegistrationSession {
  constructor(id, professorId, startDate, endDate, maxApprovedStudents) {
    this.id = id;
    this.professorId = professorId;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.maxApprovedStudents = maxApprovedStudents;
    this.applications = []; 
  }

  overlapsWith(otherSession) {
    return !(this.endDate <= otherSession.startDate || this.startDate >= otherSession.endDate);
  }

  getApprovedCount() {
    return this.applications.filter(app => app.status === 'approved').length;
  }
}
