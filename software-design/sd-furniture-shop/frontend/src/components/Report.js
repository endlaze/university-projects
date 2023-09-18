import React, {useEffect, useState} from 'react'
import {Line} from 'react-chartjs-2'
import axios from 'axios'
import _ from 'lodash'
import { Typography, makeStyles, Box} from '@material-ui/core'

const useStyles = makeStyles ((theme) => ({
  input: {
    margin: '20px 20px 0 20px',
    minWidth: 200,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

const Report = ({ branch }) => {
  const classes = useStyles();
  

  const [data, setData] = useState([])
  const [labels, setLabels] = useState([])

  let graph = {
    labels: labels,
    datasets: [
      {
        label: 'Ventas',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }
    ]
  };

  const change =()=> {
    setData([65, 70, 30, 5, 100, 32, 9])
  }

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
  }, [branch])



  return (
    <>
    <Box className={classes.paper}>
        <Typography variant="h2">
            Reporte de ventas
        </Typography>
      </Box>

      <div style={{width: '600px', margin: 'auto'}}>
        <Line data={graph}/>
      </div>
      
    </>

  );
}

export default Report