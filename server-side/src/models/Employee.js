const sql = require("../config/config");
const bcrypt = require('bcrypt');

// constructor
const Employee = function(employee) {
  this.empId = employee.empId;
  this.empName = employee.empName;
  this.email = employee.email;
  this.designation = employee.designation;
  this.phNo = employee.phNo;
  this.pwd = employee.pwd;
};

Employee.create = (newEmployee, result) => {
  bcrypt.hash(newEmployee.pwd, 10).then((hash) => {
    newEmployee.pwd = hash;
    sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("Created Employee successfully");
      result(null, { ...newEmployee });
    });
  });  
};

Employee.login = (email, result) => {
  sql.query(`SELECT * FROM Employees WHERE email = "${email}"`, (err, res) => {
    if(err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }
    if(!res.length) {  
      // not found Employee with the email
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res[0]);
  });
};

Employee.getAll = result => {
  let query = "SELECT * FROM employees";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if(res.length) {
      //console.log("Employees: ", res);
      result(null, res);
    }
  });
};

Employee.findById = (id, result) => {
  sql.query(`SELECT * FROM employees WHERE empId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Employee! ");
      result(null, res[0]);
      return;
    }

    // not found Employee with the id
    result({ kind: "not_found" }, null);
  });
};

Employee.remove = (id, result) => {
  sql.query("DELETE FROM employees WHERE empId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Employee with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Employee with id: ", id);
    result(null, res);
  });
};

Employee.removeAll = result => {
  sql.query("DELETE FROM Employees", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Employees`);
    result(null, res);
  });
};

module.exports = Employee;