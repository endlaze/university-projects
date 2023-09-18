import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { OutlinedInput, InputLabel, FormControl, Snackbar, FormControlLabel, RadioGroup, Radio, FormLabel } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { useHistory, useLocation } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import store from 'store'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/TWAMH0pzQdU)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  radio: {
    display: 'inline'
  },
  userType: {
    marginTop: 20
  }
}));

export default function Login() {
  let history = useHistory()
  let location = useLocation()
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
    login_type: 'client'
  });

  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function signIn() {

    let { from } = location.state || { from: { pathname: "/" } };
    axios.post('/account/auth/login/', {
      username: values.username,
      password: values.password,
      login_type: values.login_type
    }).then((data) => {
      if (JSON.stringify(data.data) !== JSON.stringify({})) {
        store.set('user', { ...data.data, login_type: values.login_type })
        history.replace(from);
      } else {
        setSnack({ open: true, message: 'Contraseña o usuario incorrecto', severity: 'error' })
      }

    })


  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AttachMoneyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ingresar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nombre de usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={values.username}
              onChange={handleChange('username')}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                margin="normal"
                required
                labelWidth={70}
                fullWidth
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="current-password"
              />
            </FormControl>

            <FormControl component="fieldset" className={classes.userType}>
              <FormLabel component="legend">Tipo de usuario</FormLabel>
              <RadioGroup className={classes.radio} value={values.login_type} onChange={handleChange('login_type')}>
                <FormControlLabel labelPlacement="bottom" value="client" control={<Radio color="primary" />} label="Cliente" />
                <FormControlLabel labelPlacement="bottom" value="employee" control={<Radio color="primary" />} label="Empleado" />
                <FormControlLabel labelPlacement="bottom" value="manager" control={<Radio color="primary" />} label="Gerente" />
              </RadioGroup>
            </FormControl>

            <Button

              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signIn}
            >
              Ingresar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2" >
                  {"¿No tienes una cuenta? Regístrate."}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snack.severity}>
          {snack.message}
        </Alert>
      </Snackbar>

    </Grid>
  );
}
