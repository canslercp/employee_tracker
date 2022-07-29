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

//class for Department table
class Department {
    constructor(dep_name){
        this.dep_name = dep_name;
    }
    addDepartment(){
        db.query(`INSERT INTO department (dep_name) VALUES ('${this.dep_name}');`, function (err, results) {
        });
        console.log(`Added ${this.dep_name} to the database`)
    }
}
module.exports = Department;