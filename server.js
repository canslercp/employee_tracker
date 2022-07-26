//Packages needed for the application
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
        choice: ['Add Employee', 'Uppdate Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
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

// Function call to initialize app
init();