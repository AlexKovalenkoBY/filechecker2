const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./sample.db');

// insert one row into the langs table
db.serialize(function () {
  db.each("select name from sqlite_master where type='table'", function (err, table) {
      console.log(table);
  });
});
db.run(`INSERT INTO langs(name) VALUES(?)`, ['AC'], function(err) {
  if (err) {
    return console.log(err.message);
  }
  else
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// close the database connection
db.close();