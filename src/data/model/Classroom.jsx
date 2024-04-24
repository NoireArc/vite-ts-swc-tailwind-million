class Classroom {
  constructor(id, name, schedules, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.schedules = schedules || [];
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default Classroom;
