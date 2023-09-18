import React, { useEffect, useState } from 'react'
import { Grid, Typography, Container, makeStyles, Box, Paper, Button, Snackbar, Chip } from '@material-ui/core'
import store from 'store'
import axios from 'axios'
import AddReviewModal from '../components/AddReviewModal'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({

  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  order: {
    margin: theme.spacing(1, 0),
    paddingTop: '15px'
  },
  orderTitle: {
    marginLeft: '10px'
  },
  product: {
    margin: '15px',
    background: '#f8f1da',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #4CAF50'
  },
  fontBold: {
    fontWeight: "bold"
  },
  dateLabel: {
    padding: '10px 0px 0px 9px'
  },
  reviewBTN: {
    color: 'white',
    background: '#4caf50',
    margin: '5px 0px 5px 0px'
  },
  prodImg: {
    minHeight: 200,
    maxHeight: 200,
    display: 'block',
    margin: 'auto',
    padding: 10
  },
  chip: {
    marginLeft: '20px'
  }

}));

const Orders = () => {
  const classes = useStyles()
  const [modalState, setmodalState] = useState({ open: false, idProd: 0, orderNum: 0 })
  const [state, setState] = useState({
    onlineOrders: [], onsiteOrders: []
  })
  const [onlineOrders, setOnlineOrders] = useState([])
  const [onsiteOrders, setOnSiteOrders] = useState([])
  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  useEffect(() => {
    //getOrders('/order/all/')
    getOrders('/order/all/online')
    //getOrders('/order/all/onsite')
  }, [])

  const getOrders = (route) => {
    const { cedulaCliente } = store.get('user')

    if (route === '/order/all/online') {
      axios.post(route, { cedulaCliente: cedulaCliente }).then((res) => {
        setOnlineOrders(res.data)
        getOrders('/order/all/onsite')
      })
    } else if (route === '/order/all/onsite') {
      axios.post(route, { cedulaCliente: cedulaCliente }).then((res) => {
        setOnSiteOrders(res.data)
      })
    }
  }

  const changeModalState = (idProd, orderNum) => {
    setmodalState({ open: true, idProd: idProd, orderNum: orderNum })
  }
  const handleModalClose = (added) => {
    if (added) {
      setSnack({ open: true, severity: 'success', message: 'Reseña envada.' })
    }

    setmodalState(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const validateConfirmOrder = (orderId, orderIndex) => {
    let order = onlineOrders[orderIndex]
    if (order.hasOwnProperty('entrega')) {
      return order.entrega.idEstadoOrden === 1
    } else {
      return true
    }
  }

  const emptyOrders = () => {
    return onlineOrders.length > 0 && onsiteOrders.length > 0
  }

  const confirmOrder = (consecutivo, idSucursal, orderIndex) => {

    axios.patch(`/order/update_state/`, {
      consecutivo,
      idSucursal,
      nuevoEstadoOrden: 2
    }).then((res) => {
      let newOnlineOrders = onlineOrders
      newOnlineOrders[orderIndex].entrega.idEntrega = 2
      setOnlineOrders(newOnlineOrders)
    })
  }

  return (
    <Container>
      <Box className={classes.paper}>
        <Typography variant="h2">
          Ordenes
        </Typography>
      </Box>
      {onlineOrders.map((order, index) =>
        <Paper key={index} className={classes.order}>
          <Typography variant="h4" className={classes.orderTitle}>
            Orden #{order.consecutivo}
            <Chip label="Online" color="primary" className={classes.chip} />
          </Typography>
          <Typography className={classes.dateLabel}>
            <span className={classes.fontBold}>Fecha de compra: </span> {new Date(order.fecha).toLocaleDateString()}
           &nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          {order.hasOwnProperty('entrega') ? <div>
            <Typography className={classes.dateLabel}>
              <span className={classes.fontBold}>Fecha estimada de entrega: </span> {new Date(order.entrega.fechaEstimada).toLocaleDateString()}
            </Typography>
            <Typography className={classes.dateLabel}>
              <span className={classes.fontBold}>Estado de la orden: </span> {order.entrega.idEstadoOrden}
            </Typography></div> : null}
          <Button style={{ marginLeft: '10px' }} variant="contained" color="primary" onClick={() => confirmOrder(order.consecutivo, index)} disabled={validateConfirmOrder(order.consecutivo, index)}>Confirmar recibido</Button>
          <Grid container >
            {order.productos.map((prod, key) =>
              <Grid className={classes.product} item key={key}>
                {/*<img src={prod.product.picture} className={classes.prodImg}></img>*/}
                <Typography><span className={classes.fontBold}>Producto: </span> {prod.titulo}</Typography>
                <Typography><span className={classes.fontBold}>Cantidad comprada: </span> {prod.cantidad}</Typography>
                {/*<Typography><span className={classes.fontBold}>Cantidad en backorder: </span>{prod.backorder_quantity * -1}</Typography>*/}
                <Button variant="contained" className={classes.reviewBTN} onClick={() => changeModalState(prod.codigoProducto, order.consecutivo)}>Calificar producto</Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
      {onsiteOrders.map((order, index) =>
        <Paper key={index} className={classes.order}>
          <Typography variant="h4" className={classes.orderTitle}>
            Orden #{order.consecutivo}
            <Chip label="Presencial" color="primary" className={classes.chip} />
          </Typography>
          <Typography className={classes.dateLabel}>
            <span className={classes.fontBold}>Fecha de compra: </span> {new Date(order.fecha).toLocaleDateString()}
           &nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Grid container >
            {order.productos.map((prod, key) =>
              <Grid className={classes.product} item key={key}>
                {/*<img src={prod.product.picture} className={classes.prodImg}></img>*/}
                <Typography><span className={classes.fontBold}>Producto: </span> {prod.titulo}</Typography>
                <Typography><span className={classes.fontBold}>Cantidad comprada: </span> {prod.cantidad}</Typography>
                {/*<Typography><span className={classes.fontBold}>Cantidad en backorder: </span>{prod.backorder_quantity * -1}</Typography>*/}
                <Button variant="contained" className={classes.reviewBTN} onClick={() => changeModalState(prod.codigoProducto, order.consecutivo)}>Calificar producto</Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
      {emptyOrders ? null :
        <Box className={classes.paper}>
          <Typography variant="h4">
            No hay ordenes que mostrar
          </Typography>
        </Box>
      }
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
      <AddReviewModal open={modalState.open} onClose={handleModalClose} product={modalState.idProd} idOrder={modalState.orderNum}></AddReviewModal>
    </Container>
  );
}

export default Orders;