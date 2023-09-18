import React, { useEffect,useState } from 'react'
import Employee from '../components/AddEmployee'
import Report from '../components/Report';
import axios from 'axios'
import { FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';

const useStyles = makeStyles ((theme) => ({
  input: {
    margin: '20px 20px 0 20px',
    minWidth: 200,
  },
  table: {
    margin: theme.spacing(3, 0),
  },
  total: {
    margin: theme.spacing(4, 0)
  }
}));

const GeneralManager = (props) => {
  const classes = useStyles()
  const [worplaces, setWorkplaces] = useState([])
  const [workplace, setWorkplace] = useState('')

  useEffect(()=>{
    //getWorkplaces()
  }, [])

  const getWorkplaces = () => {
    axios.get('/location/workplace/').then((workplaces)=>{
      let filtered = workplaces.data.filter((wp) => wp.wp_type === 1)
      setWorkplaces(filtered)
    })
  }

  const handleWorkplaceChange = (event) => {
    setWorkplace(event.target.value)
  }

  return(
    <>
      <Employee/>
      <FormControl className={classes.input}>
          <InputLabel>Sucursal</InputLabel>
          <Select
            value={workplace}
            onChange={handleWorkplaceChange}
          >
            {worplaces.map((wp, index) => 
              <MenuItem key={index} value={wp.id}>Sucursal {wp.state.name}</MenuItem>
            )}
            <MenuItem value={''}>Todas las ventas</MenuItem>
          </Select>
      </FormControl>
      {/*<Report branch={workplace}></Report>*/}
    </>
  );

}

export default GeneralManager;