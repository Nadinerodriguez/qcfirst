module.exports = app => {
    var accounts = require("../controllers/accounts.controller.js");
  
    // Create a new account
    app.post("/accounts", accounts.create);
  
    // Retrieve all accounts
    app.get("/accounts", accounts.findAll);
  
    // Retrieve a single account with user_id
    app.get("/accounts/:user_id", accounts.findOne);

    // Retrieve a single account with user_email
    app.get("/accounts/email/:user_email", accounts.findOneEmail);
  
    // Update a account with user_id
    app.put("/accounts/:user_id", accounts.update);
  
    // Delete a account with user_id
    app.delete("/accounts/:user_id", accounts.delete);
  
    // Delete all accounts
    app.delete("/accounts", accounts.deleteAll);
  };