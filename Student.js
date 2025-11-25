class Student extends User {
  constructor(id, name, email) 
  {
    super(id, name, email, 'student');
    this.applications = []; 
  }
}
