
import tedious from 'tedious'
import connection from '../connections/sqlServerConnection.js'

const Request = tedious.Request
const TYPES = tedious.TYPES

export const createEmployee = (req, res) => {
    connection.on('connect', (err) => {
        console.log(err)
    })

    const request = new Request('usp_insertarEmpleado', err => console.log(err));


    let json = req.body
  

    if (json.foto !== undefined) {
      let foto;
      foto = new Buffer(json.foto, 'base64');
      delete json.foto
      request.addParameter('foto', TYPES.VarBinary, foto);
    }
      

    request.addParameter('json', TYPES.VarChar, JSON.stringify(json));
    request.addOutputParameter('response', TYPES.VarChar);
    let response;

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      console.log(returnStatus)
        res.status(200).send(JSON.parse(response))
    });

    request.on('returnValue', (parameterName, value, metadata) => {
      if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}

export const login = (req, res) => {
  const request = new Request('usp_loginEmpleado', err => console.log(err));

  request.addParameter('json', TYPES.VarChar, JSON.stringify(req.body));
  request.addOutputParameter('response', TYPES.VarChar);

  let response;

  request.on('doneProc', (rowCount, more, returnStatus, rows) => {
    console.log(returnStatus)
      res.status(200).send(JSON.parse(response))
  });

  request.on('returnValue', (parameterName, value, metadata) => {
    if (parameterName === 'response') response = value
  });

  connection.callProcedure(request);
}

export const calculateSalary = (req, res) => {
  const request = new Request('usp_salarioEmpleado', err => console.log(err));

  request.addParameter('json', TYPES.VarChar, JSON.stringify(req.body));
  request.addOutputParameter('response', TYPES.VarChar);

  let response;

  request.on('doneProc', (rowCount, more, returnStatus, rows) => {
      res.status(200).send(JSON.parse(response))
  });

  request.on('returnValue', (parameterName, value, metadata) => {
    if (parameterName === 'response') response = value
  });

  connection.callProcedure(request);
}

export const employeeTypes = (req, res) => {
  let request;
  if (req.body.tipo === 'sucursal') {
    request = new Request('usp_obtenerTipoEmpleadoSucursal', err => {if (err) console.log(err)} )
  } else {
    request = new Request('usp_obtenerTipoEmpleadoTaller', err => {if (err) console.log(err)} )
  } 

  request.addParameter('json', TYPES.VarChar, JSON.stringify(req.body));
  request.addOutputParameter('response', TYPES.VarChar);

  let response;

  request.on('doneProc', (rowCount, more, returnStatus, rows) => {
    console.log(returnStatus)
      res.status(200).send(JSON.parse(response))
  });

  request.on('returnValue', (parameterName, value, metadata) => {
    if (parameterName === 'response') response = value
  });

  connection.callProcedure(request);
}