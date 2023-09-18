import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, FormControl, InputLabel} from '@material-ui/core';
import axios from 'axios'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function Address({setter}) {
  const classes = useStyles()
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])

  const [country, setCountry] = useState(0);
  const [state, setSta] = useState(0);
  const [address, setAddress] = useState('')
  const [zipCode, setZipCode] = useState('')

  useEffect(()=> {
    setter({
      country,
      state,
      address,
      zipCode
    })
  }, [country, state, address, zipCode])
  

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

  const handleChange = (setter, value) => {
    setter(value)
  }


  return (
    <>
      <Grid item xs={12}>
        <FormControl fullWidth className={classes.selector}>
          <InputLabel>Pais</InputLabel>
          <Select
            value={country}
            onChange={e => handleChange(setCountry, e.target.value)}
          >
            {countries.map((count, index) =>
              <MenuItem key={index} value={count.id}>{count.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
      <FormControl fullWidth className={classes.selector} disabled={country ? false : true} >
        <InputLabel>Estado</InputLabel>
        <Select
          value={state}
          onChange={e=> handleChange(setSta, e.target.value)}
        >
          {states.map((sta, index) =>
            <MenuItem key={index} value={sta.id}>{sta.name}</MenuItem>
          )}

        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
        onChange={e=> handleChange(setZipCode,e.target.value)}
        value={zipCode}
        variant="outlined"
        required
        fullWidth
        id="zip"
        label="Código ZIP"
        name="zip">
        </TextField>
      </Grid>
      <Grid item xs={12} >
        <TextField
          onChange={e=> handleChange(setAddress,e.target.value)}
          value={address}
          variant="outlined"
          multiline
          rows={4}
          required
          fullWidth
          id="address"
          label="Dirección"
          name="address">
        </TextField>
      </Grid>
    </>
  );
}
