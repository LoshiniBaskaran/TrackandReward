const express = require("express");
const Review = require("../models/Review.js");
const bodyParser = require("body-parser");

express().use(bodyParser.json());

// Create and Save a new Review
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Review
    const review = new Review({
        reviewedBy : req.body.reviewedBy,
        reviewedFor : req.body.reviewedFor,
        rating : req.body.rating,
        comment : req.body.comment
    });
  
    // Save Review in the database
    Review.create(review, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Review."
        });
      else res.send(data);
  });
};

// Retrieve all Reviews from the database (with condition).
exports.findAll = (req, res) => {
  Review.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reviews."
      });
    else {
      res.json(data);
    } 
  });
};

// Find a single Review with an id
exports.findById = (req, res) => {
  Review.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Review with employee id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Review with employee id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Find a single Review with an employee id
exports.findByEmp = (req, res) => {
    Review.findByEmpId(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Review with employee id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Review with employee id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Find a single Review with an contribution id
exports.findByCont = (req, res) => {
  Review.findByContId(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Review with contribution id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Review with contribution id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Delete a Review with the specified id in the request
exports.deleteById = (req, res) => {
  Review.removeById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found Review"
          });
        } else {
          res.status(500).send({
            message: "Could not delete Review"
          });
        }
      } else res.send({ message: "Review was deleted successfully!" });
      return;
    });
};

// Delete a Review with the specified emp id in the request
exports.deleteByEmp = (req, res) => {
    Review.removeByEmp(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: "Not found Review"
            });
          } else {
            res.status(500).send({
              message: "Could not delete Review"
            });
          }
        } else res.send({ message: "Review was deleted successfully!" });
      });
};

// Delete a Review with the specified init id in the request
exports.deleteByCont = (req, res) => {
  Review.removeByCont(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: "Not found Review"
          });
        } else {
          res.status(500).send({
            message: "Could not delete Review"
          });
        }
      } else res.send({ message: "Review was deleted successfully!" });
    });
};

// Delete all Reviews from the database.
exports.deleteAll = (req, res) => {
    Review.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all Reviews."
          });
        else res.send({ message: `All Reviews were deleted successfully!` });
      });
};