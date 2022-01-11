const express = require("express");
const Employee = require("../models/Employee.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

express().use(bodyParser.json());

// Create and Save a new Employee
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create an Employee
    const employee = new Employee({
        empId : req.body.empId,
        empName : req.body.empName,
        email : req.body.email,
        designation : req.body.designation,
        phNo : req.body.phNo,
        pwd : req.body.pwd
    });
  
    // Save Employee in the database
    Employee.create(employee, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Employee."
        });
      else res.send(data);
  });
};

// Retrieve all Employees from the database (with condition).
exports.findAll = (req, res) => {
  Employee.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employees."
      });
    else {
      res.json(data);
    } 
  });
};

// Find a single Employee with a id
exports.findOne = (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employee with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Employee with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// login
exports.login = (req, res) => {
  const {email, pwd} = req.body;
  Employee.login(email, (err, data) => {
      if(data) {
        bcrypt.compare(pwd, data.pwd).then((matched) => {
          if(matched) {
            console.log("Logged in!");

            const accessToken = sign({
              empId: data.empId,
              empName: data.empName,
              email: data.email,
              designation: data.designation,
              phNo: data.phNo
            }, "secretkey123");  
            
            res.json({token:accessToken, empId:data.empId, empName:data.empName, email:data.email, designation:data.designation, phNo:data.phNo});
          }
        
          else {
            res.json({error : "Incorrect Password"});
          }
        });
      }
      else {
        if (err.kind === "not_found") {
          res.json({
            error: "Incorrect login id"
          });
        } else {
          res.json({
            error: "Some error has occured! Try again later"
          });
        } 
      }
    });
};

// Delete a Employee with the specified id in the request
exports.delete = (req, res) => {
    Employee.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employee with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Employee with id " + req.params.id
            });
          }
        } else res.send({ message: `Employee was deleted successfully!` });
      });
};

// Delete all Employees from the database.
exports.deleteAll = (req, res) => {
    Employee.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all employees."
          });
        else res.send({ message: `All Employees were deleted successfully!` });
      });
};