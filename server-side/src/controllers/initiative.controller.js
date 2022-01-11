const express = require("express");
const Initiative = require("../models/Initiative.js");
const bodyParser = require("body-parser");

express().use(bodyParser.json());

// Create and Save a new Initiative
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create an Initiative
    const initiative = new Initiative({
        initName : req.body.initName,
        initDesc : req.body.initDesc,
        initStatus : req.body.initStatus,
        initDate : req.body.initDate ?? null
    });
  
    // Save Initiative in the database
    Initiative.create(initiative, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Initiative."
        });
      else res.send(data);
  });
};

// Retrieve all Initiatives from the database (with condition).
exports.findAll = (req, res) => {
  Initiative.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Initiatives."
      });
    else {
      res.json(data);
    } 
  });
};

// Find a single Initiative with a id
exports.findOne = (req, res) => {
    Initiative.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Initiative with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Initiative with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Delete a Initiative with the specified id in the request
exports.delete = (req, res) => {
    Initiative.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Initiative with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Initiative with id " + req.params.id
            });
          }
        } else res.send({ message: `Initiative was deleted successfully!` });
      });
};

// Delete all Initiatives from the database.
exports.deleteAll = (req, res) => {
    Initiative.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Initiatives."
          });
        else res.send({ message: `All Initiatives were deleted successfully!` });
      });
};