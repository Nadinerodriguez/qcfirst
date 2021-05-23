const pool = require("./db.js");

// constructor
const Account = function(account) {
  this.user_id = account.user_id;
  this.user_email = account.user_email;
  this.user_password = account.user_password;
  this.user_type = account.user_type;
};

Account.create = (newAccount, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("INSERT INTO accounts SET ?", newAccount, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created account: ", { id: res.insertId, ...newAccount });
      result(null, { id: res.insertId, ...newAccount });
  
      //release connnection
      connection.release();
    });
  });
};

Account.findById = (user_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(`SELECT * FROM accounts WHERE user_id = ${user_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found account: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found account with the id
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Account.findByEmail = (user_email, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("SELECT * FROM accounts WHERE user_email = ?", user_email, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found account: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found account with the email
      result({ kind: "not_found" }, null);
  
      //release connnection
      connection.release();
    });
  });
};

Account.getAll = result => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("calling getAll()");
    connection.query("SELECT * FROM accounts ORDER BY user_id ASC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("accounts: ", res);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Account.updateById = (user_id, account, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "UPDATE accounts SET user_email = ?, user_password = ? WHERE user_id = ?",
      [account.user_email, account.user_password, user_id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found account with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated account: ", { id: user_id, ...account });
        result(null, { id: user_id, ...account });
  
        //release connnection
        connection.release();
    });
  });
};

Account.remove = (user_id, result) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM accounts WHERE user_id = ?", user_id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found account with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted account with id: ", user_id);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

Account.removeAll = result => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("DELETE FROM accounts", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} accounts`);
      result(null, res);
  
      //release connnection
      connection.release();
    });
  });
};

module.exports = Account;