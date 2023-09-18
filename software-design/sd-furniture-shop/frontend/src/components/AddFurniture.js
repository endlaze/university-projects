import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles, FormControl, InputLabel, MenuItem, Typography, Select, TextField, Container, Button, Snackbar, Table, TableHead, TableBody, TableRow, TableCell, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: '20px 20px 20px 20px',
    minWidth: 200,
  },
  button: {
    marginTop: 30,
    marginLeft: 20
  },
  image: {
    margin: '20px',
    maxWidth: 150
  },
  table: {
    minWidth: 650
  },
  greenBG: {
    background: '#4caf50',
    color: 'white',
    margin: '5px'
  },
  pt30: {
    paddingTop: '30px'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Furniture = () => {
  const classes = useStyles();
  const [itemsTCols, setItemsTableCols] = useState([
    { title: 'Material' },
    { title: 'Eliminar' }
  ])

  const [furnitureTypes, setFurnitureTypes] = useState([])
  const [baseMaterials, setBaseMaterials] = useState([])
  const [furnMaterials, setFurnMaterials] = useState([])

  const [material, setMaterial] = useState('')
  const [furnitureType, setFurnitureType] = useState('')

  const [worplaces, setWorkplaces] = useState([])
  const [workplace, setWorkplace] = useState('')

  const [image, setImage] = useState('')

  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const title = useInput('')
  const description = useInput('')
  const price = useInput('')
  const availableQuantity = useInput('')


  useEffect(() => {
    getMany(setBaseMaterials, 'product/material/')
    getMany(setFurnitureTypes, 'product/furniture_type/')
    getWorkplaces()
  }, [])

  const getWorkplaces = () => {
    axios.get('/location/workplace/').then((workplaces)=>{
      let filtered = workplaces.data.filter((wp) => wp.wp_type === 1)
      setWorkplaces(filtered)
    })
  }

  const getMany = (setter, route) => {
    axios.get(route).then((res) => {
      setter(res.data)
    })
  }

  const submitFurniture = () => {
    const materialsIds = furnMaterials.map(mat => parseInt(mat.id))

    const furnObj = {
      title: title.value,
      description: description.value,
      price: price.value,
      available_quantity: availableQuantity.value,
      picture: image,
      furn_type_id: furnitureType,
      materials_ids: materialsIds,
      workshop_id: workplace
    }

    axios.post('/product/furniture/', furnObj).then(() => {
      setSnack({ open: true, severity: 'success', message: 'Mueble creado' })
    })
  }

  const handleChange = (setter, value) => {
    setter(value)
  }

  const findElement = (elements, elementId) => {
    return elements.find(element => element.id === elementId);
  }

  const addMaterial = () => {
    const mat = findElement(baseMaterials, material)
    setFurnMaterials([...furnMaterials, mat])
    setMaterial('')
  }

  const deleteMaterial = (matId) => {
    const mats = furnMaterials.filter(mat => mat.id !== matId);
    setFurnMaterials(mats)
  }

  const addMatBtnDisabled = () => (material === '') || (furnMaterials.filter(mat => mat.id == material).length > 0)

  const validateForm = () => {
    return (image && title.value && description.value && price.value &&
      availableQuantity.value && furnitureType && (furnMaterials.length > 0)) || false
  }

  const processImage = (imageFile) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result)
    }

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  });


  const handleFileUpload = (e) => {
    processImage(e.target.files[0]).then((encoded) => {
      setImage(encoded)
    })
  }

  return (
    <Container>
      <Box className={classes.paper}>
          <Typography variant="h2">
            Agregar un mueble
        </Typography>
        </Box>
      <div>
        <Typography variant="h6" className={classes.pt30}>Imagen del mueble</Typography>

        {(image !== '') ? <img src={image} className={classes.image}></img> : null}

        <TextField onChange={handleFileUpload} type="file" accept="image/*" variant="outlined" className={classes.input} />
      </div>
      <div noValidate autoComplete="off">
        <Typography variant="h6" className={classes.pt30}>Características del mueble</Typography>

        <TextField label="Titulo" variant="outlined" {...title} className={classes.input} />
        <TextField label="Descripcion" variant="outlined" {...description} className={classes.input} />
        <TextField label="Precio" variant="outlined" {...price} className={classes.input} />
      </div>
      <div>
        <TextField label="Cantidad disponible" variant="outlined" {...availableQuantity} className={classes.input} />
        <FormControl className={classes.input}>
          <InputLabel>Tipo de mueble</InputLabel>
          <Select
            value={furnitureType}
            onChange={e => handleChange(setFurnitureType, e.target.value)}
          >
            {furnitureTypes.map((type, index) =>
              <MenuItem key={index} value={type.id}>{type.description}</MenuItem>
            )}
          </Select>
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel>Tienda</InputLabel>
          <Select
            value={workplace}
            onChange={e => handleChange(setWorkplace, e.target.value)}
          >
            {worplaces.map((wp, index) =>
              <MenuItem key={index} value={wp.id}>{wp.wp_type === 1 ? "Sucursal " : "Taller "}{wp.state.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button onClick={() => submitFurniture()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!validateForm()}
        >
          Agregar mueble
        </Button>
      </div>
      <div className={classes.pt30}>
        <Typography variant="h6"> Agregar material </Typography>
        <FormControl className={classes.input}>
          <InputLabel>Material</InputLabel>
          <Select
            value={material}
            onChange={e => handleChange(setMaterial, e.target.value)}
          >
            {baseMaterials.map((material, index) =>
              <MenuItem key={index} value={material.id}>{material.description}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button onClick={() => addMaterial()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={addMatBtnDisabled()}
        >
          Agregar material <AddIcon></AddIcon>
        </Button>
        <Typography variant="h6" className={classes.pt30}>Lista de materiales</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {itemsTCols.map((itemCol, index) =>
                <TableCell key={index}>{itemCol.title}</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {furnMaterials.map(material =>
              <TableRow key={material.id}>
                <TableCell>{material.description}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteMaterial(material.id)}
                    variant="contained"
                    color="secondary"
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={snack.severity}>
            {snack.message}
          </Alert>
        </Snackbar>
      </div>
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

export default Furniture;