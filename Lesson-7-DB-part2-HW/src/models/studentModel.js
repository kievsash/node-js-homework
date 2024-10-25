const pool = require('../db');

const StudentModel = {
  getAllStudents: async () => {
    const result = await pool.query('SELECT * FROM Students');
    return result.rows;
  },
  createStudent: async (name, email) => {
    const result = await pool.query(
      'CALL add_student($1);',
      [name]
    );
    return result.rows[0];
  },
};

module.exports = StudentModel;
