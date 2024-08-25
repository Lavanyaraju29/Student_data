const mongoose = require('mongoose');
const studentSchema = require('../db/schemas/studentSchema');

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;