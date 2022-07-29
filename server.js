//Packages needed for the application
const fs = require('fs');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
//Query functions
const Employee = require('./lib/Employee');
const Role = require('./lib/Role')
const Department = require('./lib/Department')


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL Username
        user: 'root',
        // Add MySQL Password
        password: 'root123',
        database: 'employee_db'
    },
);  

//Function for employeeRole dropdown and manager dropdown
var roleChoices = [];
var managerChoices = [];
var employeeChoices = [];
var departmentChoices = [];

function roleChoicesFunc() {
    db.query('SELECT title FROM emp_role;', function (err, results) {
        results.map(getRole);

        function getRole(role) {
            roleChoices.push(role.title);
        }
    })
}
function managerChoicesFunc() {
    db.query('SELECT first_name, last_name, manager_id FROM employee WHERE manager_id IS NULL;', function (err, results) {
        // SELECT CONCAT(first_name," ",last_name) FROM employee WHERE manager_id = NULL;
        results.map(getManager);

        function getManager(manager) {
            managerChoices.push([manager.first_name, manager.last_name].join(" "))
        }
    })
}
function employeeChoicesFunc() {
    db.query('SELECT first_name,last_name FROM employee;', function (err, results) {
        results.map(getEmployee);

        function getEmployee(employee) {
            employeeChoices.push([employee.first_name, employee.last_name].join(" "))
        }
    })
}
function departmentChoicesFunc() {
    db.query('SELECT dep_name FROM department', function (err, results) {
        results.map(getDepartment);

        function getDepartment(department) {
            departmentChoices.push(department.dep_name);
        }
    })
}
roleChoicesFunc();
managerChoicesFunc();
employeeChoicesFunc();
departmentChoicesFunc();

// Array of questions for inquirer prompt
const mainMenu = [
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
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
        message: "What is the employee's role?",
        choices: roleChoices
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: "Who is the employee's manager?",
        choices: managerChoices
    }
]
const updateRoleQuestions = [
    {
        type: 'list',
        name: 'whichEmployee',
        message: "Which employee's role would you like to update?",
        choices: employeeChoices
    },
    {
        type: 'list',
        name: 'whichRole',
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
    }
]
const addRoleQuestions = [
    {
        type: 'input',
        name: 'nameRole',
        message: 'What is the name of the role?'
    },
    {
        type: 'input',
        name: 'salaryRole',
        message: 'What is the salary of the role?'
    },
    {
        type: 'list',
        name: 'departmentRole',
        message: 'Which department does the role belong to?',
        choices: departmentChoices
    }
]
const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'newDepartment',
        message: 'What is the name of the department?'
    }
]
// A function to initialize the app
function init() {
    console.log(' ');
    console.log('Employee Manager');

    inquirer.prompt(mainMenu)
        .then((res) => {
            switch (res.mainMenu) {
                case 'View All Employees':
                    viewEmployees()
                    break;
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
                    promptAddRole()
                    break;
                case 'View All Departments':
                    viewDepartment()
                    break;
                case 'Add Department':
                    promptAddDepartment()
            }
        })
}
//A function to view all employees
function viewEmployees(){
    db.promise().query('SELECT * FROM employee;')
        .then(([rows,fields]) => {
            console.table(rows);
        })
        .then( () => init())
        .catch(console.log)
//         // .then( () => db.end());
}
//A function for the 'add employee' promt
function promptEmployee() {
    inquirer.prompt(employeeQuestions)
        .then((res) => {
            const employee = new Employee(res.employeeFirstName, res.employeeLastName, res.employeeRole, res.employeeManager);
            employee.addEmployee();
        })
        .then(() => init() )
        .catch(console.log)
}
//A function for the 'Update Employee Role' prompt
function promptUpdateRole() {
    inquirer.prompt(updateRoleQuestions)
        .then((res) => {
            // console.log(res.whichEmployee.split(' ').shift())
            const employee = new Employee (res.whichEmployee.split(' ').shift(),res.whichEmployee.split(' ').shift(),res.whichRole);
            employee.updateRole();
        })
        .then(() => init() )
        .catch(console.log)
}
// A function to view the company's roles
function viewRole(){
    db.promise().query('SELECT * FROM emp_role;')
        .then(([rows,fields]) => {
            console.table(rows);
        })
        .then( () => init())
        .catch(console.log)
        // .then( () => db.end());
}
// A function to add a company role
function promptAddRole(){
    inquirer.prompt(addRoleQuestions)
        .then((res) => {
            const role = new Role(res.nameRole, res.salaryRole, res.departmentRole);
            role.addRole();
        })
        .then(() => init() )
        .catch(console.log)
}
// A function to view the company's departments
function viewDepartment(){
    db.promise().query('SELECT * FROM department;')
        .then(([rows,fields]) => {
            console.table(rows);
        })
        .then( () => init())
        .catch(console.log)
        // .then( () => db.end());
}
//A function to add a company department
function promptAddDepartment(){
    inquirer.prompt(addDepartmentQuestions)
        .then((res) => {
            const department = new Department(res.newDepartment);
            department.addDepartment();
        })
        .then(() =>init())
        .catch(console.log)
}
// Function call to initialize app
init();
