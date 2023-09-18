import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton, Snackbar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import store from 'store'
import MyMap from '../components/Map';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  let history = useHistory()
  const classes = useStyles();
  const [values, setValues] = useState({
    id: '',
    firstName: '',
    lastName1: '',
    lastName2: '',
    password: '',
    birthdate: '',
    address: '',
    lat: 0,
    lng: 0
  });

  const [ showPassword, setShowPassword] = useState(false)



  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitClient = () => {
    axios.post('client/create/', {
      cedulaCliente: values.id,
      nombre: values.firstName,
      apellido1: values.lastName1,
      apellido2: values.lastName2,
      fechaNacimiento: values.birthdate,
      contrasena: values.password,
      latitud: values.lat,
      longitud: values.lng,
      direccion: values.address
    }).then((res) => {
      store.set('user', res.data)
      history.replace('/login')
    }).catch(()=>{
      setSnack({ ...snack, open: true, severity: 'error', message: 'Error en la fecha o identificacion' });
    })
  }

  const submitAddress = () => {
    axios.post('client/address/new', {
      cedulaCliente: values.id,
      latitud: values.lat,
      longitud: values.lng,
      direccion: values.address
    }).then((res) => {
      store.set('user', res.data)
      history.replace('/login')
    }).catch(()=> {
      setSnack({ ...snack, open: true, severity: 'error', message: 'Error al insertar la direccion' });
    })
  }

  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  }; 

  const validFields = () => {
    console.log(values)
    let valid = true;
    for (const key in values) {
      valid = valid && values[key]
    }
    return valid !== '' && valid !== 0
  }

  const handleMapChange = (map) => {
    setValues({...values, lat: map.lat, lng: map.lng})
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AttachMoneyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={values.firstName}
                onChange={handleChange('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Primer apellido"
                name="lastName"
                autoComplete="lname"
                value={values.lastName1}
                onChange={handleChange('lastName1')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Segundo apellido"
                value={values.lastName2}
                onChange={handleChange('lastName2')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Identificacion"
                value={values.id}
                onChange={handleChange('id')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="birthdate"
                label="Fecha de nacimiento aaaa-mm-dd"
                name="birthdate"
                value={values.birthdate}
                onChange={handleChange('birthdate')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                  variant="outlined"
                  required
                  labelWidth={70}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  id="outlined-adornment-password"
                  autoComplete="current-password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
             
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Direccion del lugar de entrega"
                name="address"
                value={values.address}
                onChange={handleChange('address')}
              />
            </Grid>

            <MyMap change={handleMapChange} ></MyMap>
          </Grid>
          
          <Button
            disabled={!validFields()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=> submitClient()}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2"  >
                {"Ya tienes una cuenta? Ingresa!"}
              </Link>
            </Grid>
          </Grid>
      </div>
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
