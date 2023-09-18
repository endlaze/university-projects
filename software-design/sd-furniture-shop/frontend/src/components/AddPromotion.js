import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { makeStyles, FormControl, InputLabel, MenuItem, Select, TextField, Container, Button, Snackbar, Box, Typography } from '@material-ui/core';
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
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Review = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([])
  const [product, setProduct] = useState('')

  const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, open: false });
  };

  const discount = useInput('')
  const date = useInput('')


  useEffect(() => {
    getMany(setProducts, 'product/furniture/')
  }, [])

  const getMany = (setter, route) => {
    axios.get(route).then((res) => {
      setter(res.data)
    })
  }

  const submitPromotion = () => {
    axios.post('product/promotion/', {
      discount: discount.value,
      final_date: date.value,
      product: product,
    }).then(() => {
      setSnack({ open: true, severity: 'success', message: 'Promoción creada.' })
    })
  }

  const handleChange = (setter, value) => {
    setter(value)
  }

  const validateForm = () => {
    return (discount.value && date.value && product) || false
  }

  return (
    <>
      <Container>
        <Box className={classes.paper}>
          <Typography variant="h2">
            Agregar una Promoción
          </Typography>
        </Box>
        <Container>
          <div noValidate autoComplete="off">
            <TextField label="Descuento" variant="outlined" {...discount} className={classes.input} />
            <TextField label="Fecha" variant="outlined" {...date} className={classes.input} />
            <FormControl className={classes.input}>
              <InputLabel>Producto</InputLabel>
              <Select
                value={product}
                onChange={e => handleChange(setProduct, e.target.value)}
              >
                {products.map((product, index) =>
                  <MenuItem key={index} value={product.id}>{product.description}</MenuItem>
                )}
              </Select>
            </FormControl>
            <Button onClick={() => submitPromotion()}
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={validateForm() ? false : true}
            >
              Agregar pomoción
        </Button>

          </div>
          <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snack.severity}>
              {snack.message}
            </Alert>
          </Snackbar>


        </Container>
      </Container>
    </>
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

export default Review;