class Schedule {
  constructor(
    id,
    title,
    userId,
    time,
    classroomId,
    classroom,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.classroomId = classroomId;
    this.classroom = classroom;
    this.createdAt = createdAt;
    this.updateAt = updatedAt;
    this.userId = userId;
  }
}

export default Schedule;
