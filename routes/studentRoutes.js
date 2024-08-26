//to import thr module express using require
const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const Department = require('../models/departmentModel');

// List and search students
router.get('/students', async (req, res) => {
    const { name } = req.query;
    const query = name ? { name: new RegExp(name, 'i') } : {};
    const students = await Student.find(query).populate('department');
    res.status(200).json(students);
});

// Add a student
router.post('/students', async (req, res) => {
    const { name, registrationNumber, departmentId } = req.body;

    try {
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(400).json({ message: 'Invalid department ID' });
        }

        const student = new Student({ name, registrationNumber, department: departmentId });
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Registration Number must be unique' });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});

// Get students in a particular department
router.get('/students/department/:departmentId', async (req, res) => {
    const { departmentId } = req.params;
    const students = await Student.find({ department: departmentId }).populate('department');
    res.status(200).json(students);
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;