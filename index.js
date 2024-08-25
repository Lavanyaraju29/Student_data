require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const db = require("./db/app");
const studentRoutes = require('./routes/studentRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
db();

app.use(express.json());
app.use('/api', studentRoutes);
app.use('/api', departmentRoutes);

app.listen(PORT, () => {                                        
    console.log(`listening at http://localhost:${PORT}`)
});
