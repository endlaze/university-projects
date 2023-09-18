import React, {use, useMemo, useEffect, useState} from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  }
})

const Report = ({ branch }) => {

  const classes = useStyles();
  const [data, setData] = useState([])
  const [itemsTCols, setItemsTableCols] = useState([
    { title: 'Fecha', },
    { title: 'IdSucursal', },
    { title: 'CodigoProducto', },
    { title: 'TotalFactura' },
    { title: 'CantidadVendida', },

  ])

  useEffect(() => {
    getReport()
      
  }, [])

  const getReport = () => {
    axios.get('/report/by-date').then((res) => {
      console.log(res.data)
      processData(res.data)
      
    }).catch((err) => {
      console.log('Error')
      console.log(err)
    })
  }

  const createData = (fecha,idSucursal, codigoProducto, totalFactura, cantidadVendida) => {
      return {fecha, idSucursal, codigoProducto, totalFactura, cantidadVendida}
  }

  const processData = (orders) => {
      let arrayOfData = []
      orders.map((order) => {
          arrayOfData.push(createData(order.fecha, order.idSucursal, order.codigoProducto, order.totalFactura, order.cantidadVendida))
      })
      setData(arrayOfData)
  }

  /*
  useEffect(()=> {
    axios.post('/report/all/find_report/', {
      branch: branch
    }).then((res) => {
      let orders = res.data
      let thisData = _.map(orders, (order) => {
        let date = new Date(order.date)
        date = date.getUTCFullYear() +'-'+ (date.getUTCMonth() + 1) +'-'+ date.getUTCDate()
        return {date, selling: parseInt(order.final_selling), rawDate: order.date}
      })

      thisData = _.groupBy(thisData, 'date')
      thisData = _.map(thisData, (date) => {
        return ({
          date: new Date(date[0].rawDate).toLocaleDateString(),
          total: _.sumBy(date, 'selling'),
        })
      } )
      let lab = []
      let dat = []
      thisData.forEach((data) => {
        lab.push(data.date)
        dat.push(data.total)
      })
      setLabels(lab)
      setData(dat)

    })
  }, [branch])*/



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
                  <TableCell align='right'>{order.fecha || 'Todas las fechas'}</TableCell>
                  <TableCell align='right'>{order.idSucursal || 'Todas las sucursales'}</TableCell>
                  <TableCell align='right'>{order.codigoProducto || 'Todos los cod producto'}</TableCell>
                  <TableCell align='right'>{order.totalFactura || 'Todos los totales'}</TableCell>
                  <TableCell align='right'>{order.cantidadVendida || 'Todas las cantidades'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </>

  );
}

export default Report