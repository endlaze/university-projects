import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import axios from 'axios'
import { InputLabel, Button, Container, Box, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles((theme) => ({
  selector: {
    margin: '20px 20px 20px 20px',
    minWidth: 120,
  },
  button: {
    marginLeft: 20
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Workplace = () => {
  const classes = useStyles();

  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])

  const [country, setCountry] = useState(0);
  const [state, setSta] = useState(0);
  const [workplaceType, setWorkplaceType] = useState(1)
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getCountries();
  }, [])

  useEffect(() => {
    if (countries.length !== 0) {
      let statos = countries.find(count => count.id === country)
      statos = statos.states
      setStates(statos)
    }
  }, [country])


  const getCountries = () => {
    axios.get('location/country/').then(countries => {
      setCountries(countries.data)
    })
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value)
  }

  const handleStateChange = (event) => {
    setSta(event.target.value)
  }

  const handleWorplaceTypeChange = (event) => {
    setWorkplaceType(event.target.value)
  }

  const submitWorkplace = () => {
    axios.post('location/workplace/', {
      state_id: state,
      wp_type: workplaceType
    }).then(() => {
      setOpen(true);
    })
  }

  return (
    <Container>
      <Box className={classes.paper}>
          <Typography variant="h2">
            Agregar una sucursal
        </Typography>
        </Box>
      <div>
        <FormControl fullWidth className={classes.selector}>
          <InputLabel id="demo-simple-select-label">Pais</InputLabel>
          <Select
            value={country}
            onChange={handleCountryChange}
          >
            {countries.map((count, index) =>
              <MenuItem key={index} value={count.id}>{count.name}</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth className={classes.selector} disabled={country ? false : true} >
          <InputLabel>Estado</InputLabel>
          <Select
            value={state}
            onChange={handleStateChange}
          >
            {states.map((sta, index) =>
              <MenuItem key={index} value={sta.id}>{sta.name}</MenuItem>
            )}

          </Select>
        </FormControl>
        <FormControl fullWidth className={classes.selector}>
          <InputLabel >Tipo de sucursal</InputLabel>
          <Select
            value={workplaceType}
            onChange={handleWorplaceTypeChange}
          >
            <MenuItem value={1}>{'Sucursal'}</MenuItem>
            <MenuItem value={2}>{'Taller'}</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Button onClick={() => submitWorkplace()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={country && state && workplaceType ? false : true}
        >
          Crear sucursal
      </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sucursal creada
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Workplace;