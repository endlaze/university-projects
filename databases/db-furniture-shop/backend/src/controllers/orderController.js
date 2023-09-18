
import tedious from 'tedious'
import connection from '../connections/sqlServerConnection.js'

const Request = tedious.Request
const TYPES = tedious.TYPES

export const updateOrderState = (req, res) => {
    connection.on('connect', (err) => {
        console.log(err)
    })

    const request = new Request('usp_actualizarEstadoOrden', err => console.log(err));

    const consecutivo = parseInt(req.body.consecutivo)
    const idSucursal = parseInt(req.body.idSucursal)
    const nuevoEstadoOrden = parseInt(req.body.nuevoEstadoOrden)

    request.addParameter('consecutivo', TYPES.Int, consecutivo);
    request.addParameter('idSucursal', TYPES.Int, idSucursal);
    request.addParameter('nuevoEstadoOrden', TYPES.Int, nuevoEstadoOrden);

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        let msg = returnStatus ? 'No se pudo actualizar el estado de la orden' : 'Se actualizó el estado de la orden correctamente'
        res.status(returnStatus ? 500 : 200).send({ status: returnStatus, msg: msg })
    });

    connection.callProcedure(request);
}

export const newOnlineOrder = (req, res) => {

    const request = new Request('usp_insertarOrdenOnline', err => console.log(err));
    request.addParameter('json', TYPES.NVarChar, JSON.stringify(req.body));
    request.addOutputParameter('response', TYPES.VarChar)
    
    let response = {}

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        console.log(returnStatus)
        console.log(response)
        res.status(200).send(response)
    });
  
    request.on('returnValue', (parameterName, value, metadata) => {
        if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}

export const newOnsiteOrder = (req, res) => {

    const request = new Request('usp_insertarOrdenPresencial', err => console.log(err));
    request.addParameter('json', TYPES.NVarChar, JSON.stringify(req.body));
    request.addOutputParameter('response', TYPES.VarChar)

    let response = {}

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        console.log(returnStatus)
        console.log(response)
        res.status(200).send(response)
    });
  
    request.on('returnValue', (parameterName, value, metadata) => {
        if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}

export const getClientOnlineOrders = (req, res) => {
    const request = new Request('usp_obtenerOrdenesOnline', err => console.log(err));
    request.addParameter('json', TYPES.NVarChar, JSON.stringify(req.body));
    request.addOutputParameter('response', TYPES.VarChar)

    let response = []

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        console.log(returnStatus)
        console.log(response)
        res.status(200).send(JSON.parse(response))
    });
  
    request.on('returnValue', (parameterName, value, metadata) => {
        if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}

export const getClientOnSiteOrders = (req, res) => {
    const request = new Request('usp_obtenerOrdenesPresenciales', err => console.log(err));
    request.addParameter('json', TYPES.NVarChar, JSON.stringify(req.body));
    request.addOutputParameter('response', TYPES.VarChar)

    let response = []

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        console.log(returnStatus)
        console.log(response)
        res.status(200).send(JSON.parse(response))
    });
  
    request.on('returnValue', (parameterName, value, metadata) => {
        if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}

export const getClientOrders = (req, res) => {

    const request = new Request('usp_obtenerOrdenes', err => console.log(err));
    request.addParameter('json', TYPES.NVarChar, JSON.stringify(req.body));
    request.addOutputParameter('response', TYPES.VarChar)

    let response = []

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        console.log(returnStatus)
        console.log(response)
        res.status(200).send(JSON.parse(response))
    });
  
    request.on('returnValue', (parameterName, value, metadata) => {
        if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}


export const getPaymentTypes = (req, res) => {

    const request = new Request('usp_obtenerTipoPago', err => console.log(err));
    request.addOutputParameter('response', TYPES.VarChar)

    let response = []

    request.on('doneProc', (rowCount, more, returnStatus, rows) => {
        res.status(200).send(JSON.parse(response))
    });
  
    request.on('returnValue', (parameterName, value, metadata) => {
        if (parameterName === 'response') response = value
    });

    connection.callProcedure(request);
}