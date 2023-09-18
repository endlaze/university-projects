import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';
import store from 'store'
const useStyles = makeStyles(() => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
  }
}));

const AddressPicker = ({ address, setter }) => {
  const classes = useStyles()
  const [addresses, setAddresses] = useState([])

  useEffect(() => {
    getAddress(setAddresses)
  }, [])

  const getAddress = (setter) => {
    const {addresses} = store.get('user')
    setter(addresses)

  }

  const handleChange = (setter, value) => {
    setter(value);
  }

  return (
    <div className>
      <FormControl className={classes.input}>
        <InputLabel>Dirección</InputLabel>
        <Select
          value={address}
          onChange={e => handleChange(setter, e.target.value)}
        >
          {addresses.map((address, index) =>
            <MenuItem key={index} value={address.id}>{address.address_line}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}



export default AddressPicker