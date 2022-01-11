const express = require("express");
const Contribution = require("../models/Contribution.js");
const bodyParser = require("body-parser");

express().use(bodyParser.json());

// Create and Save a new Contribution
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
//    console.log(req.body);
  
    // Create an Contribution
    const contribution = new Contribution({
        contributedBy : req.body.contributedBy,
        contributedFor : req.body.contributedFor,
        contributionDesc : req.body.contributionDesc
    });
  
    // Save Contribution in the database
    Contribution.create(contribution, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Contribution."
        });
      else res.send(data);
  });
};

// Retrieve all Contributions from the database (with condition).
exports.findAll = (req, res) => {
  Contribution.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Contributions."
      });
    else {
      res.json(data);
    } 
  });
};

// Finf Contribution with an id
exports.findOne = (req, res) => {
  Contribution.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          console.log("Not found Contribution with id "+ req.params.id)
          res.send([]);
        } else {
          res.status(500).send({
            message: "Error retrieving Contribution with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Find Contribution with a employee id
exports.findByEmp = (req, res) => {
    Contribution.findByEmpId(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            console.log("Not found Contribution with employee id "+ req.params.id)
            res.send([]);
          } else {
            res.status(500).send({
              message: "Error retrieving Contribution with employee id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Find Contribution with an initiative id
exports.findByInit = (req, res) => {
  Contribution.findByInitId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          console.log("Not found Contribution with initiative id "+ req.params.id)
          res.send([]);
        } else {
          res.status(500).send({
            message: "Error retrieving Contribution with initiative id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Delete a Contribution with the specified id in the request
exports.deleteById = (req, res) => {
  Contribution.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found Contribution"
          });
        } else {
          res.status(500).send({
            message: "Could not delete Contribution"
          });
        }
      } else res.send({ message: "Contribution was deleted successfully!" });
    });
};

// Delete a Contribution with the specified emp id in the request
exports.deleteByEmp = (req, res) => {
    Contribution.removeByEmp(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: "Not found Contribution"
            });
          } else {
            res.status(500).send({
              message: "Could not delete Contribution"
            });
          }
        } else res.send({ message: "Contribution was deleted successfully!" });
      });
};

// Delete a Contribution with the specified init id in the request
exports.deleteByInit = (req, res) => {
  Contribution.removeByInit(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found Contribution"
          });
        } else {
          res.status(500).send({
            message: "Could not delete Contribution"
          });
        }
      } else res.send({ message: "Contribution was deleted successfully!" });
    });
};

// Delete all Contributions from the database.
exports.deleteAll = (req, res) => {
    Contribution.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Contributions."
          });
        else res.send({ message: `All Contributions were deleted successfully!` });
      });
};