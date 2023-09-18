import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { makeStyles, FormControl, InputLabel, MenuItem, Select, TextField, Container, Button, Snackbar, Box, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
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

const Employee = () => {
  const classes = useStyles();

  const [employeeTypes, setEmployeeTypes] = useState([])
  const [employeeType, setEmployeeType] = useState('')

  const [worplaces, setWorkplaces] = useState([])
  const [workplace, setWorkplace] = useState('')

  const [snack, setSnack] = useState({open: false, message: '', severity: ''})

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({...snack, open: false});
  };

  const username = useInput('')
  const name = useInput('')
  const lastName = useInput('')
  const email = useInput('')
  const password = useInput('')
  const salary = useInput('')

  

  useEffect(() => {
    getEmployeeTypes();
    getWorkplaces();
  }, [])

  const getEmployeeTypes = () => {
    axios.get('/account/employee_type/').then((employeeTypes)=>{
      setEmployeeTypes(employeeTypes.data)
    })
  }

  const getWorkplaces = () => {
    axios.get('/location/workplace/').then((workplaces)=>{
      setWorkplaces(workplaces.data)
    })
  }

  const submitEmployee = () => {
    if(checkSalary()) {
      axios.post('/account/employee/', {
        username: username.value,
        first_name: name.value,
        last_name: lastName.value,
        email: email.value,
        password: password.value,
        salary: salary.value,
        emp_type_id: employeeType,
        workplace_id: workplace
      }).then(()=>{
        setSnack({open: true, severity: 'success', message: 'Empleado creado.'})
      })
    }
  }

  const handleEmployeeTypeChange = (event) => {
    setEmployeeType(event.target.value)
  }

  const handleWorkplaceChange = (event) => {
    setWorkplace(event.target.value)
  }

  const validateForm = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (username.value && name.value && lastName.value &&
      email.value && password.value && salary.value && re.test(String(email.value).toLowerCase())) || false
  }

  const checkSalary = () => {
    if (employeeType) {
      let {min_salary, max_salary} = employeeTypes.find((element) => element.id === employeeType)
      if (parseInt(min_salary) <= parseInt(salary.value) && parseInt(salary.value) <= parseInt(max_salary)){
        return true
      }
    }
    setSnack({open: true, severity: 'error', message: 'El salario no es acorde al precio.'})
    return false
  }

  return(
    <Container>
      <Box className={classes.paper}>
          <Typography variant="h2">
            Agregar un empleado
        </Typography>
        </Box>
    <div noValidate autoComplete="off">
      <TextField label="Nombre" variant="outlined" {...name} className={classes.input}/>
      <TextField label="Apellidos" variant="outlined" {...lastName} className={classes.input}/>
      <TextField label="Nombre de usuario" variant="outlined" {...username}className={classes.input}/>
      <TextField label="Email" variant="outlined" {...email} className={classes.input}/>
      <TextField type="password" label="Contraseña" variant="outlined" {...password} className={classes.input}/>
      <TextField label="Salario" variant="outlined" {...salary} className={classes.input}/>
      <FormControl className={classes.input}>
          <InputLabel>Tipo de empleado</InputLabel>
          <Select
            value={employeeType}
            onChange={handleEmployeeTypeChange}
          >  const [open, setOpen] = useState(false);

            {employeeTypes.map((emT, index) =>
              <MenuItem key={index} value={emT.id}>{emT.desc}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel>Lugar de trabajo</InputLabel>
          <Select
            value={workplace}
            onChange={handleWorkplaceChange}
          >
            {worplaces.map((wp, index) => 
              <MenuItem key={index} value={wp.id}>{wp.wp_type === 1? "Sucursal " : "Taller "}{wp.state.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      
    </div>
    <div>
    <Button onClick={() => submitEmployee()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={validateForm()? false : true}
        >
          Agregar empleado
      </Button>
    </div>
    <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={snack.severity}>
        {snack.message}
      </Alert>
    </Snackbar>
    
      
    </Container>

  );
}

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
      setValue(e.target.value);
  }
  return {
      value: value,
      onChange: handleChange
  }
}

export default Employee;