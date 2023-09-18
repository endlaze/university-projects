import React, { useEffect, useState } from 'react'
import { Grid, Typography, Container, makeStyles, Box, Paper, Button, Snackbar } from '@material-ui/core'
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

}));

const Orders = () => {
  const classes = useStyles()
  const [modalState, setmodalState] = useState({ open: false, idProd: 0, orderNum: 0 })
  const [state, setState] = useState({
    orders: []
  })
  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  useEffect(() => {
    getOrders('/order/online/')
  }, [])

  const getOrders = (route) => {
    const { id } = store.get('user')

    axios.get(route).then((res) => {
      const orders = res.data.filter((order) => { return parseInt(order.client) === parseInt(id) })
      setState({ ...state, orders })
    })
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

  const validateConfirmOrder = (orderId, orderIndex) => (state.orders[orderIndex].delivery.status === 3)

  const confirmOrder = (orderId, orderIndex) => {
    axios.patch(`/order/delivery/${orderId}/`, { status: 3 }).then((res) => {
      let orders = state.orders
      orders[orderIndex].delivery = res.data
      setState({ ...state, orders })
    })
  }

  return (
    <Container>
      <Box className={classes.paper}>
        <Typography variant="h2">
          Ordenes
        </Typography>
      </Box>
      {state.orders.map((order, index) =>
        <Paper key={index} className={classes.order}>
          <Typography variant="h4">
            Orden #{order.id}
          </Typography>
          <Typography className={classes.dateLabel}>
            <span className={classes.fontBold}>Fecha de compra: </span> {new Date(order.date).toLocaleDateString()}
           &nbsp;&nbsp;-&nbsp;&nbsp;
           <span className={classes.fontBold}>Hora: </span> {`${new Date(order.date).getHours()}:${new Date(order.date).getMinutes()}:${new Date(order.date).getSeconds()}`}
          </Typography>
          <Typography className={classes.dateLabel}>
            <span className={classes.fontBold}>Fecha estimada de entrega: </span> {new Date(order.delivery.delivery_date).toLocaleDateString()}
          </Typography>
          <Typography className={classes.dateLabel}>
            <span className={classes.fontBold}>Estado de la orden: </span> {order.delivery.status_caption}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => confirmOrder(order.id, index)} disabled={validateConfirmOrder(order.id, index)}>Confirmar recibido</Button>
          <Grid container >
            {order.ord_products.map((prod, key) =>
              <Grid className={classes.product} item key={key}>
                <img src={prod.product.picture} className={classes.prodImg}></img>
                <Typography><span className={classes.fontBold}>Producto: </span> {prod.product.title}</Typography>
                <Typography><span className={classes.fontBold}>Cantidad comprada: </span> {prod.quantity}</Typography>
                <Typography><span className={classes.fontBold}>Cantidad en backorder: </span>{prod.backorder_quantity * -1}</Typography>
                <Button variant="contained" className={classes.reviewBTN} onClick={() => changeModalState(prod.product.id, order.id)}>Calificar producto</Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
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