import mssql from "mssql";

var sql = require("mssql");
var config = {
  user: "sa",
  password: "55555",
  server: "DESKTOP-GIUFTSQ",
  database: "food_delivery",
  port: 1433,
  options: {
    encrypt: false,
    useUTC: true,
  },

  // pool: {
  //   max: 100,
  //   min: 0,
  //   // idleTimeoutMillis: 3600000,
  //   // connectionTimeout: 3600000,
  //   // requestTimeout: 3600000,
  // },
};
var database = new sql.ConnectionPool(config);

const DBProvider = () => {
  connect();
};

const connect = () => {
  database
    .connect()
    .then(function () {
      console.log("connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export async function executeQuery(queryString) {
  try {
    // connect();
    let data = await database.request().query(queryString);
    // database.close();
    return data.recordset;
  } catch (error) {
    console.log(error);
  }
}

export async function executeNonQuery(queryString) {
  try {
    // connect();
    let data = await database.request().query(queryString);

    return data.rowsAffected;
  } catch (error) {
    console.log(error);
  }
}

export default DBProvider;
