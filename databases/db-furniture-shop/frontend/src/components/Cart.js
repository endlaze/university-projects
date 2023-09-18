import React, {useEffect, useState} from 'react'
import {useStore} from '../Store'
import { Table, TableHead, TableRow, TableBody, TableCell,
         TextField, Button, Typography, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles ((theme) => ({
  input: {
    margin: '20px 20px 0 20px',
    minWidth: 200,
  },
  table: {
    margin: theme.spacing(3, 0),
  },
  total: {
    margin: theme.spacing(4, 0)
  }
}));

const Cart = ({total, setTotal}) => {
  const classes = useStyles()
  const [store, dispatch] = useStore()

  const handleProductChange = (value, id) => {
    dispatch({ type: 'change-quantity', quantity: value, id: id })
  }

  const [itemsTCols, setItemsTableCols] = useState([
    { title: 'Titulo', },
    { title: 'Descripcion', },
    { title: 'Cantidad', },
    { title: 'Precio' },
    { title: 'Eliminar', },

  ])
  useEffect(() => {
    let tot = 0
    store.cart.forEach(product => {
      tot += parseInt(product.precio) * parseInt(product.quantity)
    });
    setTotal(tot)
  }, [store])

  return (
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow >
            {itemsTCols.map((itemCol, key) => {
              return <TableCell key={key}>{itemCol.title}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {store.cart.map((product, index) =>
            <TableRow key={index}>
              <TableCell>{product.titulo}</TableCell>
              <TableCell>{product.descripcion}</TableCell>
              <TableCell>
                <TextField
                  InputProps={{ inputProps: { min: 1 } }}
                  type="number"
                  value={product.quantity}
                  onChange={e => handleProductChange(e.target.value, product.codigoProducto)}
                  label="Cantidad" variant="outlined" className={classes.input} />
              </TableCell>
              <TableCell>
                {parseInt(product.precio) * parseInt(product.quantity)}
              </TableCell>
              <TableCell>
                <Button onClick={() => dispatch({ type: 'delete-from-cart', id: product.codigoProducto })}
                  variant="contained"
                  color="secondary"
                >
                  <DeleteIcon className={classes.deleteIcon}></DeleteIcon>
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className={classes.total}>
        <Typography variant="h4">
          Total {total}
        </Typography>
      </div>
    </>
  );
}

export default Cart;