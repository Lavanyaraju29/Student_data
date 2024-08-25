const mongoose = require('mongoose');
const departmentSchema = require('../db/schemas/departmentSchema');

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department