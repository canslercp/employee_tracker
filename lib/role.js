// Connect to database
const mysql = require('mysql2');

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

//Class for Role table
class Role {
    constructor(title, salary, department_id){
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    addRole(){
        db.query(`INSERT INTO emp_role (title, salary, department_id) VALUES (${this.title},${this.salary},${this.department_id});`, function (err, results) {
            console.log(`Added ${this.title} to the database`)
        });
    }
}

module.exports = Role;