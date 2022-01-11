const sql = require("../config/config");

// constructor
const Contribution = function(contribution) {
  this.contributedBy = contribution.contributedBy;
  this.contributedFor = contribution.contributedFor;
  this.contributionDesc = contribution.contributionDesc;
};

Contribution.create = (newContribution, result) => {
  sql.query("INSERT INTO Contributions SET ?", newContribution, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Contribution !");
    result(null, { ...newContribution });
  });
};

Contribution.getAll = result => {
  let query = "SELECT * FROM Contributions";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Found Contributions: ", res.length);
    result(null, res);
  });
};

Contribution.findById = (id, result) => {
  sql.query(`SELECT * FROM Contributions c INNER JOIN
   Employees e ON c.contributedBy=e.empId
   WHERE contributionId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Contributions!");
      result(null, res[0]);
      return;
    }

    // not found Contribution with the id
    result({ kind: "not_found" }, null);
  });
};

Contribution.findByEmpId = (id, result) => {
  sql.query(`SELECT * FROM Contributions WHERE contributedBy = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Contributions: ", res.length);
      result(null, res);
      return;
    }

    // not found Contribution with the id
    result({ kind: "not_found" }, null);
  });
};

Contribution.findByInitId = (id, result) => {
  sql.query(`SELECT * FROM Contributions c INNER JOIN
   Employees e ON c.contributedBy = e.empID
   WHERE contributedFor = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Contributions: ", res.length);
      result(null, res);
      return;
    }

    // not found Contribution with the id
    result({ kind: "not_found" }, null);
  });
};

Contribution.remove = (id, result) => {
  sql.query("DELETE FROM Contributions WHERE contributionId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Contribution with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Contributions");
    result(null, res);
  });
};

Contribution.removeByEmp = (empId, result) => {
  sql.query("DELETE FROM Contributions WHERE contributedBy = ?", empId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Contribution with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Contributions");
    result(null, res);
  });
};

Contribution.removeByInit = (initId, result) => {
  sql.query("DELETE FROM Contributions WHERE contributedFor = ?", initId,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Contribution with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Contributions");
    result(null, res);
  });
};

Contribution.removeAll = result => {
  sql.query("DELETE FROM Contributions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Contributions`);
    result(null, res);
  });
};

module.exports = Contribution;