const mysql = require('mysql2/promise');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      // TODO: Add MySQL Password
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

    async roleChoices(){ 
        await db.query('SELECT id AS value, title AS name FROM emp_role', function (err, results) {
        return results;
    });
}

    async addEmployee(){
        await db.query(`INSERT INTO produce (first_name, last_name, role_id, manager_id) VALUES (${this.first_name},${this.last_name},${this.role_id},${this.manager_id})`);
    }
    
}


module.exports = Employee;