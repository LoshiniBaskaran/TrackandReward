//import dependencies
const express = require('express');
const path = require('path');
const db = require('./src/config/config');
const cors = require("cors");

const PORT = 3001;

//Import Routes
const executeTableCreations = require("./src/routes/executeTableCreations");
const employeeRouter = require("./src/routes/Employees");
const initiativeRouter = require("./src/routes/Initiatives");
const contributionRouter = require("./src/routes/Contributions");
const reviewRouter = require("./src/routes/Reviews");
const subscriptionRouter = require("./src/routes/Subscriptions");


//start the express app
const app = express();

app.use(express.json());
app.use(cors());

/* IMPORT MIDDLEWARES
app.get('/', (req, res) => res.send('Node App is running')); */

// Routers
app.use('/', executeTableCreations);
app.use("/employees", employeeRouter);
app.use("/initiatives", initiativeRouter);
app.use("/contributions", contributionRouter);
app.use("/reviews", reviewRouter);
app.use("/subscriptions", subscriptionRouter); 



//connect to database once app is started
db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('connected')
  });

  //make the connection global
  global.db = db;
  
  
  //to keep the connection alive, make frequent quries to SQL database
  setInterval(function () {
    
      db.query('SELECT 1');
  }, 5000);
   

app.listen( PORT, () => {
    console.log(`WebApp running on port  ${PORT}`);
});

module.exports = app