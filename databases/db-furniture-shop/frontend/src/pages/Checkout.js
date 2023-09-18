import React, { useContext, useState, useEffect } from 'react'
import { Checkbox, Container, Typography, Paper, TextField, makeStyles, Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { useStore } from '../Store'
import axios from 'axios'
import Cart from '../components/Cart';
import Payments from '../components/Payments'
import browserStore from 'store'
import { useHistory } from 'react-router-dom';
import Coupon from '../components/Coupon'

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  
}));

const Checkout = () => {

  const { cedulaCliente, login_type, idSucursal, cedulaEmpleado } = browserStore.get('user')
  const classes = useStyles();
  const [store, dispatch] = useStore();
  const [total, setTotal] = useState(0)
  const [deliver, setDeliver] = useState(false)
  const coupon = useState('')
  const discount = useState('')
  const [id, setId] = useState(cedulaCliente)
  const payment = useState(0)

  let history = useHistory();

  const placeOrder = () => {

    if (login_type === 'client') {
      axios.post('/order/new/online/', {
        entrega: deliver,
        productos: store.cart.map((prod) => ({codigoProducto: prod.codigoProducto, cantidad: prod.quantity, precioCobrado: prod.precio})),
        cedulaCliente: cedulaCliente,
        idTipoPago: payment[0],
        cupon: coupon[0],
        descuento: discount[0]
      }).then((res)=> {
        dispatch({type: 'clear-cart'})
        history.replace('/orders');
      })

    } else {
      axios.post('/order/new/onsite/', {
        productos: store.cart.map((prod) => ({codigoProducto: prod.codigoProducto, cantidad: prod.quantity, precioCobrado: prod.precio})),
        cedulaEmpleado: cedulaEmpleado,
        cedulaCliente: id,
        idSucursal: idSucursal,
        idTipoPago: payment[0],
        cupon: coupon[0],
        descuento: discount[0]
      }).then((res)=> {
        dispatch({type: 'clear-cart'})
        history.replace('/orders');
      })
    }
    
  }

  return (
    <>
      <Container>
        <Box className={classes.paper}>
          <Typography variant="h2">
            Carrito
        </Typography>
        </Box>
        {store.cart.length > 0 ?
          <div>
            <Cart total={total} setTotal={setTotal}/>
            {login_type === 'client' ? 
              <>
                <div className={classes.input}>
                  <Typography>¿Desea incluir transporte?</Typography>
                  <Checkbox
                    checked={deliver}
                    onChange={()=>setDeliver(!deliver)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </div>
              </>
              :
              <>
                <div className={classes.input}>
                <Typography>Cedula del cliente</Typography>
                  <TextField value={id} onChange={(e)=>setId(e.target.value)}></TextField>
                </div>

              </>
            }
            <div>
              <Payments payment={payment}/>
            </div>
            <Coupon cedulaCliente={cedulaCliente || id} coupon={coupon} discount={discount}></Coupon>
            
            <div>
              <Button variant="contained" color="primary" onClick={()=> placeOrder()}>
                Pagar
              </Button>
            </div>
          </div>
        :
          <Box className={classes.paper}>
            <Typography variant="h4">
              Su carrito esta vacio
          </Typography>
          </Box>
        }
      </Container>
    </>
  );
}

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value: value,
    onChange: handleChange
  }
}

export default Checkout;