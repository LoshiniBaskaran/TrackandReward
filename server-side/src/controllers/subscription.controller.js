const express = require("express");
const Subscription = require("../models/Subscription.js");
const bodyParser = require("body-parser");

express().use(bodyParser.json());

// Create and Save a new Subscription
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Subscription
    const subscription = new Subscription({
        subBy : req.body.subBy,
        subFor : req.body.subFor
    });
  
    // Save Subscription in the database
    Subscription.create(subscription, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Subscription."
        });
      else res.send(data);
  });
};

// Retrieve all Subscriptions from the database (with condition).
exports.findAll = (req, res) => {
  Subscription.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Subscriptions."
      });
    else {
      res.json(data);
    } 
  });
};

// Find a single Subscription with an employee id
exports.findByEmp = (req, res) => {
    Subscription.findByEmpId(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            console.log("Not found Subscription with employee id "+ req.params.id)
            res.send([]);
          } else {
            res.status(500).send({
              message: "Error retrieving Subscription with employee id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Find a single Subscription with an initiative id
exports.findByInit = (req, res) => {
  Subscription.findByInitId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          console.log("Not found Subscription with initiative id "+ req.params.id)
          res.send([]);
        } else {
          res.status(500).send({
            message: "Error retrieving Subscription with initiative id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Delete a Subscription with the specified emp id in the request
exports.deleteById = (req, res) => {
  Subscription.removeById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found Subscription"
          });
        } else {
          res.status(500).send({
            message: "Could not delete Subscription"
          });
        }
      } else res.send({ message: "Subscription was deleted successfully!" });
    });
};

// Delete a Subscription with the specified emp id in the request
exports.deleteByEmp = (req, res) => {
    Subscription.removeByEmp(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: "Not found Subscription"
            });
          } else {
            res.status(500).send({
              message: "Could not delete Subscription"
            });
          }
        } else res.send({ message: "Subscription was deleted successfully!" });
      });
};

// Delete a Subscription with the specified init id in the request
exports.deleteByInit = (req, res) => {
  Subscription.removeByInit(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found Subscription"
          });
        } else {
          res.status(500).send({
            message: "Could not delete Subscription"
          });
        }
      } else res.send({ message: "Subscription was deleted successfully!" });
    });
};

// Delete all Subscriptions from the database.
exports.deleteAll = (req, res) => {
    Subscription.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Subscriptions."
          });
        else res.send({ message: `All Subscriptions were deleted successfully!` });
      });
};