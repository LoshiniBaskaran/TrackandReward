const sql = require("../config/config");

// constructor
const Review = function(review) {
  this.reviewedBy = review.reviewedBy;
  this.reviewedFor = review.reviewedFor;
  this.rating = review.rating;
  this.comment = review.comment;
};

Review.create = (newReview, result) => {
  sql.query("INSERT INTO Reviews SET ?", newReview, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Review! ");
    result(null, { ...newReview });
    return;
  });
};

Review.getAll = result => {
  let query = "SELECT * FROM Reviews";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Reviews: ", res.length);
    result(null, res);
  });
};

Review.findById = (id, result) => {
  sql.query(`SELECT * FROM Reviews r INNER JOIN
   Employees e ON r.reviewedBy = e.empID
   WHERE reviewId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Reviews! ");
      result(null, res);
      return;
    }

    // not found Review with the employee id
    result({ kind: "not_found" }, null);
  });
};

Review.findByEmpId = (id, result) => {
  sql.query(`SELECT * FROM Reviews WHERE reviewedBy = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Reviews: ", res.length);
      result(null, res);
      return;
    }

    // not found Review with the employee id
    result({ kind: "not_found" }, null);
  });
};

Review.findByContId = (id, result) => {
  sql.query(`SELECT * FROM Reviews r INNER JOIN
   Employees e ON r.reviewedBy = e.empID
   WHERE reviewedFor = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Reviews! ");
      result(null, res);
      return;
    }

    // not found Review with the cont id
    result({ kind: "not_found" }, null);
  });
};

Review.removeById = (id, result) => {
  sql.query("DELETE FROM Reviews WHERE reviewId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Review with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Reviews");
    result(null, res);
  });
};

Review.removeByEmp = (id, result) => {
  sql.query("DELETE FROM Reviews WHERE reviewedBy = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Review with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Reviews");
    result(null, res);
  });
};
    
Review.removeByCont = (id, result) => {
  sql.query("DELETE FROM Reviews WHERE reviewedFor = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Review with the cont id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Reviews");
    result(null, res);
  });
};

Review.removeAll = result => {
  sql.query("DELETE FROM Reviews", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Reviews`);
    result(null, res);
  });
};

module.exports = Review;