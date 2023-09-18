
import tedious from 'tedious'
import connection from '../connections/sqlServerConnection.js'

const Request = tedious.Request
const TYPES = tedious.TYPES


export const salesByDate = (req, res) => {

  const request = new Request('usp_ventasGenerales', err => console.log(err));

  request.addOutputParameter('response', TYPES.VarChar);

  let response = {}

  request.on('doneProc', (rowCount, more, returnStatus, rows) => {
    console.log(returnStatus)
    res.status(200).send(JSON.parse(response))
  });

  request.on('returnValue', (parameterName, value, metadata) => {
    if (parameterName === 'response') response = value
  });

  connection.callProcedure(request);
}


export const salesByEmployee = (req, res) => {

  const request = new Request('usp_ventasEmpleado', err => console.log(err));

  request.addOutputParameter('response', TYPES.VarChar);

  let response = {}

  request.on('doneProc', (rowCount, more, returnStatus, rows) => {
    console.log(returnStatus)
    res.status(200).send(JSON.parse(response))
  });

  request.on('returnValue', (parameterName, value, metadata) => {
    if (parameterName === 'response') response = value
  });

  connection.callProcedure(request);
}
