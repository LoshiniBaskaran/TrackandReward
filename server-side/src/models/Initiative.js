const sql = require("../config/config");

// constructor
const Initiative = function(initiative) {
  this.initName = initiative.initName;
  this.initDesc = initiative.initDesc;
  this.initStatus = initiative.initStatus;
  this.initDate = initiative.initDate ?? null;
};

Initiative.create = (newInitiative, result) => {
  sql.query("INSERT INTO initiatives SET ?", newInitiative, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Created Initiative! ");
    result(null, { ...newInitiative });
  });
};

Initiative.getAll = result => {
  let query = "SELECT * FROM Initiatives";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Initiatives: ", res.length);
    result(null, res);
  });
};

Initiative.findById = (id, result) => {
  sql.query(`SELECT * FROM Initiatives WHERE initId = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Initiative with id : ", res[0].initId);
      result(null, res[0]);
      return;
    }

    // not found Initiative with the id
    result({ kind: "not_found" }, null);
  });
};


Initiative.remove = (id, result) => {
  sql.query("DELETE FROM Initiatives WHERE initId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Initiative with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Initiative with id: ", id);
    result(null, res);
  });
};

Initiative.removeAll = result => {
  sql.query("DELETE FROM Initiatives", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Initiatives`);
    result(null, res);
  });
};

module.exports = Initiative;