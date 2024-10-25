const StudentModel = require('../models/studentModel');

const StudentService = {
  getAllStudents: async () => {
    return await StudentModel.getAllStudents();
  },
  createStudent: async (name) => {
    return await StudentModel.createStudent(name);
  },
};

module.exports = StudentService;
