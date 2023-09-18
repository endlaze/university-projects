import React, { useEffect, useState } from 'react'
import { Grid, Typography, Container, makeStyles, Box, Paper, Button, Snackbar, Chip } from '@material-ui/core'
import store from 'store'
import axios from 'axios'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import PP from '../assets/pp.jfif'

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
  },
  pp: {
    margin: '0 auto',
    borderRadius: '50%',
    maxWidth: '40%',
    display: 'block'
  },
  ppContainer: {
    width: 'auto !important',
  },
  data: {
    textAlign: 'center'
  }

}));

const Profile = () => {
  const { cedulaCliente } = store.get('user')
  const classes = useStyles()
  const [state, setState] = useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    lat: 0,
    lng: 0,
    fechaNacimiento: '',
    lineaDireccion: ''
  })


  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = () => {
    console.log(cedulaCliente)
    axios.post('/client/find', {
      cedulaCliente: cedulaCliente
    }).then((rs) => {
      const data = rs.data.cliente
      
      setState({
        nombre: data.nombre,
        apellido1: data.apellido1,
        apellido2: data.apellido2,
        lat: data.lat,
        lng: data.lng,
        fechaNacimiento: data.fechaNacimiento,
        lineaDireccion: data.lineaDireccion
      })
    })
  }


  return (
    <Container>
      <Box className={classes.paper}>
        <Typography variant="h2">
          Datos personales
        </Typography>
        <div className={classes.ppContainer}>
            <img className={classes.pp} src={PP}></img>
          </div>
        <Grid container>

          <Grid item xs={12} >
            <Typography variant='h4' className={classes.data}>{state.nombre}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4' className={classes.data}>{state.apellido1}&nbsp;{state.apellido2}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4' className={classes.data}> Fecha de nacimiento: {state.fechaNacimiento}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h4' className={classes.data}> Direccion: {state.lineaDireccion}</Typography>
          </Grid>
          <Map center={[state.lat, state.lng]} zoom={13}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={[state.lat, state.lng]}>
              <Popup>Mi ubicacion</Popup>
            </Marker>
          </Map>
        </Grid>
      </Box>
    </Container>
  );
}

export default Profile;