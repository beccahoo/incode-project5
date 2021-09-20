require('dotenv').config();

const express = require('express');
// Routes
const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const schedulesRouter = require('./routes/schedules');
const recoverPasswordRouter = require('./routes/recover-password');