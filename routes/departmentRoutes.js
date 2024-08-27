//to import the express module

const express = require('express');
const router = express.Router();
const Department = require('../models/departmentModel');
const Student = require('../models/studentModel');

// List and search departments
router.get('/departments', async (req, res) => {
    const { name } = req.query;
    const query = name ? { name: new RegExp(name, 'i') } : {};
    const departments = await Department.find(query);
    res.status(200).json(departments);
});

// Add a department
router.post('/departments', async (req, res) => {
    const { name } = req.body;

    try {
        const department = new Department({ name });
        await department.save();
        res.status(201).json(department);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Department name must be unique' });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});

// Delete a department
router.delete('/departments/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const students = await Student.find({ department: id });
        if (students.length > 0) {
            return res.status(400).json({ message: 'Cannot delete department with assigned students' });
        }

        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;