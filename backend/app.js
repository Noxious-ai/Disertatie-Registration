const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health.routes');
const studentRoutes = require('./routes/students.routes');
const professorRoutes = require('./routes/professors.routes');
const sessionRoutes = require('./routes/sessions.routes');
const preliminaryRoutes = require('./routes/preliminary.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/preliminary-applications', preliminaryRoutes);

module.exports = app;
