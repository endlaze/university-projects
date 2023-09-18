import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, IconButton } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Address from '../components/AddAddress';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import store from 'store'

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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    birthday: ''
  });

  const [showPassword, setShowPassword] = useState(false)

  const [addressValues, setAddressValues] = useState({
    country: '',
    state: '',
    address: '',
    zipCode: ''
  })



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
    axios.post('account/client/', {
      username: values.username,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      birthdate: values.birthday
    }).then((res) => {
      store.set('user', res.data)
      submitAddress(res.data.id)
    })
  }

  const validFields = () => {
    let valid = true;
    for (const key in values) {
      valid = valid && values[key]
    }
    for (const key in addressValues) {
      valid = valid && addressValues[key]
    }
    return valid !== '' && valid !== 0
  }

  const submitAddress = (client_id) => {
    axios.post('account/address/', {
      state_id: addressValues.state,
      zip_code: addressValues.zipCode,
      address_line: addressValues.address,
      client_id,
    }).then((res) => {
      history.replace('/login');
    })
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
              label="Apellidos"
              name="lastName"
              autoComplete="lname"
              value={values.lastName}
              onChange={handleChange('lastName')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              value={values.username}
              onChange={handleChange('username')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="birthday"
              label="Fecha de nacimiento aaaa/mm/dd"
              name="birthday"
              value={values.birthday}
              onChange={handleChange('birthday')}
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

          <Address setter={setAddressValues}></Address>

        </Grid>

        <Button
          disabled={!validFields()}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => submitClient()}
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
    </Container>
  );
}
