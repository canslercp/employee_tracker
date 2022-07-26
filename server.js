//Packages needed for the application
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
//Query functions
const Employee = require('./Employee');

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
        choices: ['Sales Lead','Salesperson','Lead Engineer','Software Engineer','Account Manager','Accountant','Legal Team Lead','Lawyer','Customer Service','Sales Lead','Salesperson','Lead Engineer']
    }
    
]

// A function to initialize the app
function init() {
    console.log('Employee Manager');
    console.log(' ');

    inquirer.prompt(mainMenu)
        .then((res) => {
            switch (res.mainMenu){
                case 'Add Employee':
                    addEmployee()
                    break;
                case 'Update Employee Role':
                    updateRole()
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
function addEmployee(){
    inquirer.prompt(employeeQuestions)
    .then((res) => {

    })
}
// Function call to initialize app
init();