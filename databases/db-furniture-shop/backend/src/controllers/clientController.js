import mysqlConnection from '../connections/mysqlServerConnection.js'

export const createClient = (req, res) => {
    mysqlConnection.query("CALL usp_insertarCliente(?)", JSON.stringify(req.body), (err, result) => {
        if (err) throw err;
        console.log(result)
        result = JSON.parse(result[0][0].response)
        res.status(result.codigo).send(result)
    });
}

export const authClient = (req, res) => {
    mysqlConnection.query("CALL usp_loginCliente(?)", JSON.stringify(req.body), (err, result) => {
        if (err) throw err;

        result = JSON.parse(result[0][0].response)
        res.status(result.codigo).send(result)
    });
}

export const checkClientExists = (req, res) => {

    mysqlConnection.query("CALL usp_verifExistCliente(?)", req.body.cedulaCliente, (err, result) => {
        if (err) throw err;

        result = JSON.parse(result[0][0].response)
        res.send(result)
    });
}

export const createCoupon = (req, res) => {

    mysqlConnection.query("CALL usp_insertarCupon(?)", JSON.stringify(req.body), (err, result) => {
        if (err) throw err;

        result = JSON.parse(result[0][0].response)
        res.send(result)
    });
}

export const getAllUserCoupons = (req, res) => {

    mysqlConnection.query("CALL usp_obtenerCuponesCliente(?)", req.body.cedulaCliente, (err, result) => {
        if (err) throw err;

        result = JSON.parse(result[0][0].response)
        res.status(result.codigo).send(result)
    });
}

export const getUsrInfo = (req, res) => {

    mysqlConnection.query("CALL usp_leerInfoCliente(?)", req.body.cedulaCliente, (err, result) => {
        if (err) throw err;

        result = JSON.parse(result[0][0].response)
        res.send(result)
    });
}

export const validateCoupon = (req, res) => {

    mysqlConnection.query("CALL usp_validarCupon(?, ?)", [req.body.cupon, req.body.cedulaCliente], (err, result) => {
        if (err) throw err;

        result = JSON.parse(result[0][0].response)
        res.status(result.codigo).send(result)
    });
}

export const newAddress = (req, res) => {

    mysqlConnection.query("CALL usp_insertarDireccion(?)", JSON.stringify(req.body), (err, result) => {
        if (err) throw err;

        result = JSON.parse(result[0][0].response)
        res.status(result.codigo).send(result)
    });
}