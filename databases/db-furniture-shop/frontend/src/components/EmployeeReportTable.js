import React, {use, useMemo, useEffect, useState} from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  }
})

const Report = ({ branch }) => {

  const classes = useStyles();
  const [data, setData] = useState([])
  const [itemsTCols, setItemsTableCols] = useState([
    { title: 'CedulaEmpleado', },
    { title: 'TotalFactura', },
    { title: 'Fecha', },
  ])

  useEffect(() => {
    getReport()
      
  }, [])

  const getReport = () => {
    axios.get('/report/by-employee').then((res) => {
      console.log(res.data)
      processData(res.data)
      
    }).catch((err) => {
      console.log('Error')
      console.log(err)
    })
  }

  const createData = (totalFactura, cedulaEmpleado, fecha) => {
      return {totalFactura, cedulaEmpleado, fecha}
  }

  const processData = (orders) => {
      let arrayOfData = []
      orders.map((order) => {
          arrayOfData.push(createData(order.totalFactura, order.cedulaEmpleado, order.fecha))
      })
      setData(arrayOfData)
  }

  return (
    <>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow >
                {itemsTCols.map((itemCol, key) => {
                  return <TableCell align='right' key={key}>{itemCol.title}</TableCell>
                })}
              </TableRow>
          </TableHead>
            <TableBody>
              {data.map((order, index) => (
                <TableRow key={index}>
                  <TableCell align='right'>{order.cedulaEmpleado || 'Vendido por empleado'}</TableCell>
                  <TableCell align='right'>{order.totalFactura || 'Todos los totales'}</TableCell>
                  <TableCell align='right'>{order.fecha || 'Todas las fechas'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>

  );
}

export default Report