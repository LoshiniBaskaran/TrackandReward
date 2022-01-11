const sql = require("../config/config");

// constructor
const Subscription = function(subscription) {
  this.subBy = subscription.subBy;
  this.subFor = subscription.subFor;
};

Subscription.create = (newSubscription, result) => {
  sql.query("INSERT INTO Subscriptions SET ?", newSubscription, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Subscription! ");
    result(null, { ...newSubscription });
  });
};

Subscription.getAll = result => {
  let query = "SELECT * FROM Subscriptions";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Subscriptions: ", res.length);
    result(null, res);
  });
};

Subscription.findByEmpId = (id, result) => {
  sql.query(`SELECT * FROM Subscriptions s INNER JOIN
   Employees e ON s.subBy = e.empID
   WHERE subBy = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Subscriptions! ", res.length);
      result(null, res);
      return;
    }

    // not found Subscription with the id
    result({ kind: "not_found" }, null);
  });
};

Subscription.findByInitId = (id, result) => {
  sql.query(`SELECT * FROM Subscriptions s INNER JOIN
   Employees e ON s.subBy = e.empID
   WHERE subFor = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Subscriptions! ");
      result(null, res);
      return;
    }

    // not found Subscription with the id
    result({ kind: "not_found" }, null);
  });
};

Subscription.removeById = (empId, result) => {
  sql.query("DELETE FROM Subscriptions WHERE subId = ?", empId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Subscription with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Subscriptions");
    result(null, res);
  });
};

Subscription.removeByEmp = (empId, result) => {
  sql.query("DELETE FROM Subscriptions WHERE subBy = ?", empId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Subscription with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Subscriptions");
    result(null, res);
  });
};

Subscription.removeByInit = (initId, result) => {
  sql.query("DELETE FROM Subscriptions WHERE subFor = ?", initId,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Subscription with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Subscriptions");
    result(null, res);
  });
};

Subscription.removeAll = result => {
  sql.query("DELETE FROM Subscriptions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Subscriptions`);
    result(null, res);
  });
};

module.exports = Subscription;