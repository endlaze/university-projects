import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles, Typography, TextField, Container, Button, Snackbar, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


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
  const detail = useInput('')
  const quantity = useInput('')

  const submitFurniture = () => {

    const furnObj = {
      titulo: title.value,
      descripcion: description.value,
      precio: price.value,
      detalle: detail.value,
      foto: image,
      cantidad: quantity.value
    }

    axios.post('/product/new', furnObj).then(() => {
      setSnack({ open: true, severity: 'success', message: 'Mueble creado' })
      title.setValue('')
      description.setValue('')
      price.setValue('')
      detail.setValue('')
      quantity.setValue('')
      setImage('')
    })
  }

  const validateForm = () => {
    return (image && title.value && description.value && price.value &&
      detail.value && quantity.value) || false
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
        <TextField label="Detalle" variant="outlined" {...detail} className={classes.input} />
        <TextField label="Precio" variant="outlined" {...price} className={classes.input} />
      </div>
      <div>
        <TextField label="Cantidad" variant="outlined" {...quantity} className={classes.input} />
        <Button onClick={() => submitFurniture()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!validateForm()}
        >
          Agregar mueble
        </Button>
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
    onChange: handleChange,
    setValue
  }
}

export default Furniture;