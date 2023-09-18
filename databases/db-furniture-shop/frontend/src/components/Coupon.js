import React, { useState } from 'react'
import browserStore, { set } from 'store'
import { TextField, Button, Snackbar, Typography, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { useStore } from '../Store'
import Alert from '@material-ui/lab/Alert'

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

const Coupon = ({cedulaCliente, coupon, discount}) => {
  const classes = useStyles()

  const [coup, setCoup]     = coupon
  const [disc, setDiscount] = discount
  const [used, setUsed]         = useState(false)
  const [store, dispatch]       = useStore()
  const [snack, setSnack]       = useState({ open: false, message: '', severity: '' })
  const [c, sc]                 = useState('')

  const validateCoupon = () => {
    if(!used) {
      axios.post('/client/coupon/validate', {
        cedulaCliente: cedulaCliente,
        cupon: c
      }).then((res) => {
        if (res.data.codigo === 200) {
          dispatch({type: 'apply-discount', discount: res.data.descuento})
          setUsed(true)
          setDiscount(res.data.descuento)
          setCoup(res.data.codigo)
          setSnack({open: true, message: 'Cupon agregado correctamente'})
        } else {
          setSnack({open: true, message: 'Cupon invalido', severity: 'error'})
        }
      }).catch((err)=> {
        console.log(err)
        setSnack({open: true, message: 'Cupon invalido', severity: 'error'})
      })
    }
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  return(
    <> 
    <div className={classes.input}>
      <Typography>Aplicar cupon</Typography>
      <TextField value={c} onChange={(e)=>sc(e.target.value)}></TextField>
      <Button
        onClick={()=> validateCoupon()}
      >
        Usar cupon
      </Button>
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snack.severity}>
            {snack.message}
          </Alert>
        </Snackbar>
        </div>
    </>
  );
}

export default Coupon;