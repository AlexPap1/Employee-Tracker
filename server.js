// Global variables
const express = require('express');
const path = require('path');
const { resourceLimits } = require('worker_threads');
const connection = require('./db/connection');

// Tell node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
