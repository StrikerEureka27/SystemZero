const mysql = require('mysql');
// Convertir callbacks a promesas
const { promisify } = require('util');
const database  =  require('./keys.js');

const pool = mysql.createPool(database);


    // Regresa un callback 
pool.getConnection((err, con) => {
    if(err) {
        console.error(err);
    } 
    if(con){
        con.release();
        console.log('Database connection is successful');
        return;
    }
})

// Promisify Pool Querys 
pool.query = promisify(pool.query);

module.exports = pool;