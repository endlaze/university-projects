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
    const [snack, setSnack] = useState({ open: false, message: '', severity: '' })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnack({ ...snack, open: false });
    };

    const cedulaCliente = useInput('')
    const fechaVencimiento = useInput('')
    const descuento = useInput('')

    const submitFurniture = () => {

        const couponObj = {
            cedulaCliente: cedulaCliente.value,
            fechaVencimiento: fechaVencimiento.value,
            descuento: descuento.value
        }

        axios.post('/client/coupon/new', couponObj).then(() => {
            setSnack({ open: true, severity: 'success', message: 'Cupón creado' })
            cedulaCliente.setValue('')
            fechaVencimiento.setValue('')
            descuento.setValue('')
        })
    }

    const validateForm = () => {
        return (cedulaCliente.value && fechaVencimiento.value && descuento.value) || false
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

    return (
        <Container>
            <Box className={classes.paper}>
                <Typography variant="h2">
                    Crear un cupón
        </Typography>
            </Box>
            <div noValidate autoComplete="off">
                <Typography variant="h6" className={classes.pt30}>Datos del cupón</Typography>
                <TextField label="Cedula del cliente" variant="outlined" {...cedulaCliente} className={classes.input} />
                <TextField label="Fecha: yyyy-mm-dd" variant="outlined" {...fechaVencimiento} className={classes.input} />
                <TextField label="Descuento" variant="outlined" {...descuento} className={classes.input} />
            </div>
            <div>
                <Button onClick={() => submitFurniture()}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!validateForm()}
                >
                    Crear cupon
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