// Global variables
const mysql = require('mysql');
const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const path = require('path');
const { resourceLimits } = require('worker_threads');
const connection = require('./db/connection');
const { inherits } = require("util");
//const db = require("./db");
//const consoleTable = require('console.table')

// const connection = mysql.createConnection({
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'root',
//     password: 'password',
//     database: 'employee_db'
// },
//     console.log('connected to empoyee_db database')
// );

// Tell node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3006;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
                    value: "viewDepartments"
                },
                {
                    name:"View all roles",
                    value: "viewRoles"
                },
                {
                    name:"View all employees",
                    value: "viewEmployees"
                },
                {
                    name:"Add a department",
                    value: "addDepartments"
                },
                {
                    name:"Add a role",
                    value: "addRoles"
                },
                {
                    name:"Add an employee",
                    value: "addEmployees"
                },
                {
                    name:"Update an employee role",
                    value: "updateEmployees"
                }
            ]
        }
    ]).then(choice => {
        switch(choice.questions) {
            case "viewDepartments":
                viewDepartments();
                break;
            case "viewRoles":
                viewRoles();
                break;
            case "viewEmployees":
                viewEmployees();
                break;
            case "addDepartments":
                addDepartments();
                break;
            case "addRoles":
                addRoles();
                break;
            case "addEmployees":
                addEmployees();
                break;
            case "updateEmployees":
                updateEmployees();
                break;
        }
    })
};

//view functions
function viewDepartments() {
    console.log('Viewing Departments');
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.log(err);
        }
        console.log(res);
    })
    questions();
};

function viewRoles() {
    console.log('Viewing Roles');
};

function viewEmployees() {
    console.log('Viewing Employees');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
    })
    questions();
};

//add functions
function addDepartments() {
    console.log('Adding Departments');
};

function addRoles() {
    console.log('Adding Roles');
};

function addEmployees() {
    console.log('Adding Employees');
};

//update functions
function updateEmployees() {
    console.log('Updating Employees');
};

//console log to notify localhost active
app.listen(PORT, () => {
    console.log(`🌐 listening at http://localhost:${PORT}`)
});

init();