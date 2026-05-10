import mysql from "mysql2";

const db = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "Prasanna12345*",

  database: "taskmanager",

});

db.connect((err) => {

  if (err) {

    console.log(err);

  }

  else {

    console.log("MySQL Connected");

  }
});

export default db;