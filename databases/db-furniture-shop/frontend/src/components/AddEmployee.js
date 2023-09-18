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

  const [workplace, setWorkplace] = useState()

  const [snack, setSnack] = useState({open: false, message: '', severity: ''})

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({...snack, open: false});
  };

  const cedulaEmpleado = useInput('')
  const nombre = useInput('')
  const apellido1 = useInput('')
  const apellido2 = useInput('')
  const contrasena = useInput('')
  const workplaces = ["Sucursal Alajuela", "Sucursal Cartago", "Sucursal Heredia"]
  

  useEffect(() => {
    getEmployeeTypes();
  }, [workplace])

  const getEmployeeTypes = () => {
    axios.post('/employee/type/', {
      tipo: workplace? 'sucursal' : 'taller'
    }).then((res)=>{
      setEmployeeTypes(res.data)
    }).catch(()=> {
      console.log('No se pueden obtener los tipos de empleado')
    })
  }

  const submitEmployee = () => {
    axios.post('/account/employee/', {
      cedulaEmpleado: cedulaEmpleado.value,
      nombre: nombre.value,
      apellido1: apellido1.value,
      apellido2: apellido2.value,
      contrasena: contrasena.value,
      idTipoEmpleado: employeeType,
      idSucursal: workplace
    }).then(()=>{
      setSnack({open: true, severity: 'success', message: 'Empleado creado.'})
    }).catch(()=>{
      setSnack({open: true, severity: 'danger', message: 'Empleado no creado.'})
    })
    
  }

  const handleEmployeeTypeChange = (event) => {
    setEmployeeType(event.target.value)
  }

  const handleWorkplaceChange = (event) => {
    setWorkplace(event.target.value)
  }

  const validateForm = () => {
    return (cedulaEmpleado.value && nombre.value && apellido1.value && apellido2.value || false)
  }


  return(
    <Container>
      <Box className={classes.paper}>
          <Typography variant="h2">
            Agregar un empleado
          </Typography>
      </Box>
      <div noValidate autoComplete="off">
        <TextField label="Nombre" variant="outlined" {...nombre} className={classes.input}/>
        <TextField label="Primer apellido" variant="outlined" {...apellido1} className={classes.input}/>
        <TextField label="Segundo apellido" variant="outlined" {...apellido2} className={classes.input}/>
        <TextField label="Nombre de usuario" variant="outlined" {...cedulaEmpleado}className={classes.input}/>
        <TextField type="password" label="Contraseña" variant="outlined" {...contrasena} className={classes.input}/>
        <FormControl className={classes.input}>
            <InputLabel>Tipo de empleado</InputLabel>
            <Select
              value={employeeType}
              onChange={handleEmployeeTypeChange}
            >

              {employeeTypes.map((emT, index) =>
                <MenuItem key={index} value={workplace?emT.idTipoEmpleadoSucursal:emT.idTipoEmpleadoTaller}>{emT.descripcion}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel>Lugar de trabajo</InputLabel>
            <Select
              value={workplace}
              onChange={handleWorkplaceChange}
            >
              <MenuItem value={null}>Taller</MenuItem>
              {workplaces.map((wp, index) => 
                <MenuItem key={index} value={index + 1}>{wp}</MenuItem>
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