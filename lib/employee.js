const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root123',
      database: 'employee_db'
    }
  );

//Class for Employee table
class Employee{
    constructor(first_name, last_name, role_id, manager_id){
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager = manager_id;
    }

    addEmployee(){
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${this.first_name},${this.last_name},${this.role_id},${this.manager_id});`, function (err, results) {
            console.log(`Added ${this.first_name} ${this.last_name} to the database`)
        });
    }
    
    updateRole(){
        db.query(`UPDATE employee SET role_id = ${this.role_id} WHERE first_name = ${this.first_name};`, function (err, results) {
            console.log("Updated employee's role")
        });
    }
}


module.exports = Employee;