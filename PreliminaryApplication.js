class PreliminaryApplication {
  constructor(id, studentId, professorId, sessionId) {
    this.id = id;
    this.studentId = studentId;
    this.professorId = professorId;
    this.sessionId = sessionId;
    this.status = 'pending'; // 'pending', 'approved', 'rejected'
    this.justification = null;
    this.studentFile = null;
    this.professorResponseFile = null;
  }

  approve() {
    this.status = 'approved';
  }

  reject(reason) {
    this.status = 'rejected';
    this.justification = reason;
  }

  uploadStudentFile(filePath) {
    this.studentFile = filePath;
  }

  uploadProfessorFile(filePath) {
    this.professorResponseFile = filePath;
  }
}
