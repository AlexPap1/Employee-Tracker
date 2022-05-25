// Global variables
const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const path = require('path');
const { resourceLimits } = require('worker_threads');
const connection = require('./db/connection');
const { inherits } = require("util");

// Tell node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

init();

//function to start inquirer
function init() {
    questions();
};

function questions() {
    inquirer.prompt([
        {
            type: 'list',
            name:'questions',
            message:'What would you like to view?',
            choices: [
                {
                    name:"View all departments",
                    value: ""
                },
                {
                    name:"View all roles",
                    value: ""
                },
                {
                    name:"View all employees",
                    value: ""
                },
                {
                    name:"Add a department",
                    value: ""
                },
                {
                    name:"Add a role",
                    value: ""
                },
                {
                    name:"Add an employee",
                    value: ""
                },
                {
                    name:"Update an employee role",
                    value: ""
                },
            ]
        }
    ])
};

//connection to port
app.listen(PORT, function() {
    console.log(`listening at ${PORT}`)
});