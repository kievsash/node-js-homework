const express = require('express');
const router = express.Router();
const StudentService = require('../services/studentService');

router.get('/', async (req, res) => {
  try {
    const students = await StudentService.getAllStudents();
    res.json(students);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newStudent = await StudentService.createStudent(name);
    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
