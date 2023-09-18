let connection = require('../dataBaseConnection')
let Request = require('tedious').Request;
let _ = require('lodash');

exports.procToJson = (procName) => new Promise((resolve, reject) => {
  connection.acquire((error, conn) => {
    if (error) {
      console.log(error);
      return;
    }
    let list = []
    let request = new Request(procName, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      conn.release();
    });

    request.on('row', (columns) => {
      let newTuple = sqlToJson(columns);
      list.push(newTuple);
    });

    request.on('requestCompleted', () => {
      resolve(list);
    });

    conn.execSql(request);
  })
})

exports.procToJsonWithParams = (procName, listOfParams) => new Promise((resolve, reject) => {
  connection.acquire((error, conn) => {
    if (error) {
      console.log(error);
      return;
    }
    let list = []
    let request = new Request(procName, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      conn.release();
    });

    _.forEach(listOfParams, (params) => {
      let { p1, p2, p3 } = params;
      request.addParameter(p1, p2, p3);
    });

    request.on('row', (columns) => {
      let newTuple = sqlToJson(columns);
      list.push(newTuple);
    });

    request.on('requestCompleted', () => {
      resolve(list);
    });

    conn.callProcedure(request);
  })
})


sqlToJson = (columns) => {
  let newTuple = {};
  columns.forEach((column) => {
    newTuple[column.metadata.colName] = column.value;
  });
  return newTuple;
}