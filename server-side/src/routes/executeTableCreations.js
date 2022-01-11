const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../config/config');

const router = express.Router();


router.get('/', async (req, res) => {
    const sql = fs.readFileSync(path.join(__dirname, '../db/schema.sql')).toString();
    const query = await db.query(sql,  (err, result) => {
        if (err){
             throw err;
        }else{
            res.send("Query run successfully");
        }
    
        });
})


module.exports = router;