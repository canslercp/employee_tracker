//Packages needed for the application
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
//Query functions
const Employee = require('./lib/Employee');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL Username
        user: 'root',
        // TODO: Add MySQL Password
        password: 'root123',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
);

// Array of questions
const mainMenu = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['Add Employee', 'Uppdate Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }
]

var roleChoices = [];
const employeeQuestions = [
    {
        type: 'input',
        name: 'employeeFirstName',
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: "What is the employee's last name?",
    },
    {
        type: 'list',
        name: 'employeeRole',
        messaeg: "What is the employee's role?",
        choices: roleChoices
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the employee's manager?",
        //need to update choices with queries
        choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', 'Malia Brown']
    }
]
const updateRoleQuestions = [
    {
        type: 'list',
        name: 'whichEmployee',
        message: "Which employee's role would you like to update?",
        //need to update choices with queries
        choices: []
    },
    {
        type: 'list',
        name: 'whichRole',
        message: "Which role do you want to assign the selected employee?",
        //need to update choices with queries
        choices: []
    }
]

// A function to initialize the app
function init() {
    console.log('Employee Manager');
    console.log(' ');

    inquirer.prompt(mainMenu)
        .then((res) => {
            switch (res.mainMenu) {
                case 'Add Employee':
                    promptEmployee()
                    break;
                case 'Update Employee Role':
                    promptUpdateRole()
                    break;
                case 'View All Roles':
                    viewRole()
                    break;
                case 'Add Role':
                    addRole()
                    break;
                case 'View All Departments':
                    viewDepartment()
                    break;
                case 'Add Department':
                    addDepartment()
            }
        })
}

//A function for the 'add employee' promt
function promptEmployee() {
    inquirer.prompt(employeeQuestions, db.query('SELECT title FROM emp_role;', function (err, results) {
    
            results.map(getRole);

            function getRole(role) {
                roleChoices.push(role.title);
            }
        }))
        .then((res) => {
            const employee = new Employee(res.employeeFirstName, res.employeeLastName, res.employeeRole, res.employeeManager);
            employee.addEmployee();
        })
}

//A function for the 'Update Employee Role' prompt
function promptUpdateRole() {
    inquirer.prompt(updateRoleQuestions)
        .then((res) => {

        })
}
// Function call to initialize app
init();