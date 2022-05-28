// Global variables
const mysql = require('mysql');
const inquirer = require("inquirer");
const fs = require("fs");
const express = require('express');
const path = require('path');
const { resourceLimits } = require('worker_threads');
const { inherits } = require("util");

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_db'
},
    console.log('connected to empoyee_db database')
);

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
    var query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    questions();
};

function viewRoles() {
    console.log('Viewing Roles');
    var query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
    questions();
};

function viewEmployees() {
    console.log('Viewing Employees');
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.names AS department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON department.id = roles.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id;', (err, res) => {
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
    inquirer.prompt([
        {
            name: 'addDepartment',
            type: 'input',
            message: 'What is the name of the new department?'
        }
    ]).then((res) => {
        connection.query(
            'INSERT INTO department SET ?',
            {
                names: res.addDepartment
            }
        );
        var query = 'SELECT * FROM department';
        connection.query(query, (err, res) => {
            if(err) throw err;
            console.table(res);
        })
        questions();
    })
};

function addRoles() {
    console.log('Adding Roles');
    inquirer.prompt([
        {
            name: 'addRole',
            type: 'input',
            message: 'What is the name of the new role?'
        },
        {
            name: 'addSalary',
            type: 'input',
            message: 'What is the salary of the new role?'
        },
        {
            name: 'Department',
            type: 'input',
            message: "Which department does the role belong to?"

        }
    ]).then((res) => {
        connection.query(
            'INSERT INTO roles SET ?',
            {
                title: res.addRole,
                salary: res.addSalary,
                department_id: res.Department
            }
        );
    var query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
    })
    questions();
    });
};

function addEmployees() {
    console.log('Adding Employees');
    inquirer.prompt([
        {
            name: 'addEmployeeFN',
            type: 'input',
            message: 'What is their first name?'
        },
        {
            name: 'addEmployeeLN',
            type: 'input',
            message: 'What is their last name?'
        },
        {
            name: 'role',
            type: 'input',
            message: "What is their role id?"

        },
        {
            name: 'manager',
            type: 'input',
            message: "What is their manager id?"

        }
    ]).then((res) => {
        connection.query(
            'INSERT INTO employee SET ?',
            {
                first_name: res.addEmployeeFN,
                last_name: res.addEmployeeLN,
                role_id: res.role,
                manager_id: res.manager
            }
        );
    viewEmployees();
    });
};

//update functions
function updateEmployees() {
    console.log('Updating Employees');
    inquirer.prompt([
        {
            type: 'input',
            name: 'old_id',
            message: "What is the id number of the employee you'd like to update?"
        },
        {
            type: 'input',
            name: 'new_role',
            message: 'What is the id number of the new role for this employee?',
        }
    ]).then((res) => {
        console.log("Updating the employee role")
        connection.query('SELECT id FROM employee WHERE id=${res.old_id}');
        connection.query('UPDATE employee SET ? WHERE role_id=${res.old_id}',
        {
            role_id: res.new_role,
        });
    })
}
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        })
    questions();
};

//console log to notify localhost active
app.listen(PORT, () => {
    console.log(`🌐 listening at http://localhost:${PORT}`)
});

init();