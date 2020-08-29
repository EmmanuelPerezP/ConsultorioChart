const sqlite3 = require("sqlite3").verbose();

export default class Database {
  constructor() {
    // open the database
    this.db = '';
  }

  open() {
    let promise = new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(
        "/home/ema/source/ConsultorioChart/datos.sqlite",
        sqlite3.OPEN_READWRITE,
        err => {
          if (err) {
            console.error(err.message);
          reject(err.message);
          }
          console.log("Connected to the database.");
          resolve()
        }
      );
    });
    return promise;
  }

  close() {
    let promise = new Promise((resolve, reject) => {
        this.db.close(err => {
        if (err) {
          console.error(err.message);
          reject(err.message);
        }
        console.log("Close the database connection.");
        resolve()
      });
    });
    return promise;
  }


  async dictamenesPorMes (year) {
    let sql = `
      SELECT CAST(strftime("%Y",Fecha) as integer) AS Year,
      CAST(strftime("%m",Fecha) as integer) AS Month,
      COUNT(Codigo) AS Total
      FROM comprasDic
      WHERE Year = ?
      GROUP BY strftime("%m-%Y", Fecha) 
      ORDER BY strftime("%Y-%m", Fecha);

    `;
    // wrap query in a promise to return result
    let promise = new Promise((resolve, reject) => {
      this.db.all(sql, [year], (err, rows) => {
        if (err) {
          throw err;
        }
        resolve(rows);
      });
    });
    let result = await promise; // pause till the promise resolves 
    return result;
  }

  async dictamenesPorDiaSemana (year) {
    let sql = `
      SELECT strftime("%w",Fecha) AS DayOfWeek,
      COUNT(Codigo) AS Total
      FROM comprasDic
      GROUP BY strftime("%w", Fecha) 
      ORDER BY strftime("%w", Fecha);
    `;
    // wrap query in a promise to return result
    let promise = new Promise((resolve, reject) => {
      this.db.all(sql, [year], (err, rows) => {
        if (err) {
          throw err;
        }
        resolve(rows);
      });
    });
    let result = await promise; // pause till the promise resolves 
    return result;
  }

  async dictamenesPorDiaMes (year) {
    let sql = `
      SELECT strftime("%d",Fecha) AS DayOfMonth,
      COUNT(Codigo) AS Total
      FROM comprasDic
      GROUP BY strftime("%d", Fecha) 
      ORDER BY strftime("%d", Fecha);
    `;
    // wrap query in a promise to return result
    let promise = new Promise((resolve, reject) => {
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        resolve(rows);
      });
    });
    let result = await promise; // pause till the promise resolves 
    return result;
  }


}
