import React, { useContext, useState, useEffect } from 'react'
import { Container, Typography, Paper, TextField, makeStyles, Button, Box, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useStore } from '../Store'
import axios from 'axios'

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
  credit: {
    marginRight: '10px'
  }
}));

const Payments = ({payment}) => {
  const classes = useStyles();
  const [payments, setPayments] = useState([])
  const [pay, setPay] = payment;

  useEffect(()=> {
    getPaymetTypes()
  },[])

  const getPaymetTypes = () => {
    axios.get('order/payment-types/').then((res) => {
      setPayments(res.data)
    }).catch((err)=> {
      console.log(err)
    })
  }

  return (
    <>
      <div>
        <div>
          <FormControl className={classes.input}>
            <Typography>Metodo de pago</Typography>
            <Select
              value={pay}
              onChange={(e) => setPay(e.target.value)}
            >
              {payments.map((p) => 
                <MenuItem key={p.idTipoPago} value={p.idTipoPago}>{p.descripcion}</MenuItem>
              )}
            </Select>
          </FormControl>
          {pay === 1 ? 
            <div className={classes.input}>
              <Typography variant="subtitle1">
              Datos de tarjeta de credito
              </Typography>
              <TextField className={classes.credit} label="Número de tarjeta" variant="outlined"  />
              <TextField className={classes.credit} label="Fecha de vencimiento" variant="outlined"  />
              <TextField className={classes.credit} label="CVV" variant="outlined"  />
            </div>
          :
            <>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default Payments;