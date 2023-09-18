import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, makeStyles, FormControl, Grid, InputLabel, MenuItem, Select, Dialog, DialogTitle, TextField, Container, Button, Snackbar, Typography, Table, TableCell, TableBody, Backdrop, Fade, TableHead, TableRow, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    input: {
        margin: '20px 20px 20px 20px',
        minWidth: 200,
    },
    button: {
        marginTop: 30,
        marginLeft: 20
    },
    table: {
        minWidth: 650
    },
    greenBG: {
        background: '#4caf50',
        color: 'white',
        margin: '5px'

    },
    m5: {
        margin: '5px'
    },
    matLabel: {
        margin: '5px 0px 5px 0px',
        padding: '5px 0px 5px 0px',
        borderRadius: '4px',
        textAlign: 'center'
    },
    gridItem: {
        background: '#ffb74d',
        borderRadius: '4px',
        margin: '5px'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        margin: '20px',
        maxWidth: 150
      },
}));

const initMatModState = { open: false, comboItemId: '', selectedMaterial: '' }


const Combo = () => {
    const history = useHistory()
    const classes = useStyles();

    const [furnitureTypes, setFurnitureTypes] = useState([])
    const [baseMaterials, setBaseMaterials] = useState([])
    const [workplaces, setWorkplaces] = useState([])
    const [matModal, setMatModal] = useState(initMatModState);
    const [image, setImage] = useState('')

    const [furnitureType, setFurnitureType] = useState('')
    const [workplace, setWorkplace] = useState('')

    const [itemsTCols, setItemsTableCols] = useState([
        { title: 'Tipo de mueble' },
        { title: 'Material' },
        { title: 'Cantidad' },
        { title: 'Eliminar' }
    ])

    useEffect(() => {
        getMany(setBaseMaterials, 'product/material/')
        getMany(setFurnitureTypes, 'product/furniture_type/')
        getWorkplaces()
    }, [])

    const getWorkplaces = () => {
        axios.get('/location/workplace/').then((workplaces) => {
            let filtered = workplaces.data.filter((wp) => wp.wp_type === 1)
            setWorkplaces(filtered)
        })
    }

    const handleModalOpen = (comboItemId) => {
        setMatModal({ open: true, comboItemId: comboItemId, selectedMaterial: '' })
    };

    const handleModalClose = () => {
        setMatModal(initMatModState)
    };

    const updateSelectedMaterial = (materialId) => {
        setMatModal({ ...matModal, selectedMaterial: materialId })
    };

    const [comboItems, setComboItems] = useState([])

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

    const getMany = (setter, route) => {
        axios.get(route).then((res) => {
            setter(res.data)
        })
    }

    const addComboItem = () => {
        const selectedfurnFype = findElement(furnitureTypes, furnitureType)
        const comboItem = { id: uuidv4(), furn_type: selectedfurnFype, materials: [], quantity: 1 }
        const newComboItems = [...comboItems, comboItem]
        setComboItems(newComboItems)
        setFurnitureType('')

    }

    const saveMatItem = () => {
        if (matModal.selectedMaterial === '') return;
        addMatToItem(matModal.comboItemId, matModal.selectedMaterial)
        handleModalClose()
    }

    const addMatToItem = (itemId, matId) => {
        const itemMaterial = findElement(baseMaterials, matId)
        const newItems = comboItems.map(comboItem => {
            if (comboItem.id === itemId) {
                comboItem.materials = [...comboItem.materials, itemMaterial]
            }
            return comboItem
        })

        setComboItems(newItems)
    }

    const deleteMatFromItem = (itemId, matId) => {
        const newItems = comboItems.map(comboItem => {
            if (comboItem.id === itemId) {
                comboItem.materials = comboItem.materials.filter(mat => mat.id !== matId);
            }
            return comboItem
        })

        setComboItems(newItems)
    }


    const deleteComboItem = (comboItemId) => {
        const newComboItems = comboItems.filter(comboItem => comboItem.id !== comboItemId);
        setComboItems(newComboItems)
    }

    const updateItemQuantity = (itemId, quantity) => {
        let newItems = comboItems.map(comboItem => {
            comboItem.quantity = (comboItem.id === itemId) ? quantity : comboItem.quantity
            return comboItem
        })

        setComboItems(newItems)
    }

    const findElement = (elements, elementId) => {
        return elements.find(element => element.id === elementId);
    }

    const submitFurnitureCombo = () => {
        const comboProducts = comboItems.map(comboItem => {
            const materialsIds = comboItem.materials.map(material => material.id)

            return {
                quantity: comboItem.quantity,
                furn_type_id: comboItem.furn_type.id,
                materials_ids: materialsIds
            }
        })

        axios.post('/product/furniture_combo/', {
            title: title.value,
            workshop_id: workplace,
            description: description.value,
            price: price.value,
            available_quantity: availableQuantity.value,
            combo_products: comboProducts,
            picture: image
        }).then(() => {
            setSnack({ open: true, severity: 'success', message: 'Combo creado.' })
            setTimeout(()=> {window.location.reload()}, 2000)
            
        })
    }

    const handleChange = (setter, value) => {

        setter(value)
    }

    const validateForm = () => {
        return (title.value && description.value && price.value &&
            availableQuantity.value && (comboItems.length > 0)) && validateMaterials() || false
    }

    const validateMaterials = () => {
        let boolArr = comboItems.map(comboItem => (comboItem.materials.length > 0))
        let res = boolArr.reduce((accumulator, currentVal) => accumulator && currentVal)

        return res
    }

    const validateItemForm = () => {
        return (furnitureType) || false
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
                    Agregar un combo
                </Typography>
            </Box>
            <div>
                <Typography variant="h6" className={classes.pt30}>Imagen del combo</Typography>

                {(image !== '') ? <img src={image} className={classes.image}></img> : null}

                <TextField onChange={handleFileUpload} type="file" accept="image/*" variant="outlined" className={classes.input} />
            </div>
            <div noValidate autoComplete="off">
                <Typography variant="h6">Caracteristicas del combo</Typography>
                <TextField label="Titulo" variant="outlined" {...title} className={classes.input} />
                <TextField label="Descripcion" variant="outlined" {...description} className={classes.input} />
                <TextField label="Precio" variant="outlined" {...price} className={classes.input} />
                <TextField label="Cantidad disponible" variant="outlined" {...availableQuantity} className={classes.input} />
            </div>
            <div>
                <FormControl className={classes.input} >
                    <InputLabel>Tienda</InputLabel>
                    <Select
                        value={workplace}
                        onChange={e => handleChange(setWorkplace, e.target.value)}
                    >
                        {workplaces.map((wp, index) =>
                            <MenuItem key={index} value={wp.id}>{wp.wp_type === 1 ? "Sucursal " : "Taller "}{wp.state.name}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button onClick={() => submitFurnitureCombo()}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={validateForm() ? false : true}
                >
                    Agregar combo
                </Button>
            </div>

            <div>
                <Typography variant="h6">Agregar mueble</Typography>
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

                <Button onClick={() => addComboItem()}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={validateItemForm() ? false : true}
                >
                    Agregar mueble
                </Button>
            </div>

            <div>
                <Typography variant="h6">Lista de muebles</Typography>
            </div>

            <Snackbar open={snack.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snack.severity}>
                    {snack.message}
                </Alert>
            </Snackbar>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {itemsTCols.map((itemCol, index) =>
                            <TableCell key={index}>{itemCol.title}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {comboItems.map(item =>
                        <TableRow key={item.id}>
                            <TableCell>{item.furn_type.description}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleModalOpen(item.id)}
                                    variant="contained"
                                    className={classes.greenBG}
                                >
                                    Nuevo material
                                    <AddIcon></AddIcon>
                                </Button>
                                <div>
                                    <Grid item xs={12}>
                                        {item.materials.map((material, index) =>
                                            <Grid key={index} container justify="center" className={classes.gridItem} >
                                                <label className={classes.matLabel}>{material.description}</label>
                                                <Button onClick={() => deleteMatFromItem(item.id, material.id)}>
                                                    <DeleteIcon></DeleteIcon>
                                                </Button>
                                            </Grid>
                                        )}
                                    </Grid>
                                </div>
                            </TableCell>
                            <TableCell>
                                <TextField variant="outlined" type="number" className={classes.input} defaultValue={item.quantity} InputProps={{ inputProps: { min: 1 } }}
                                    onChange={e => updateItemQuantity(item.id, e.target.value)}
                                />
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => deleteComboItem(item.id)}
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

            <Dialog onClose={() => handleModalClose()} open={matModal.open}>
                <DialogTitle >Seleccionar material</DialogTitle>
                <div>
                    <FormControl className={classes.input}>
                        <InputLabel>Material</InputLabel>
                        <Select
                            value={matModal.selectedMaterial}
                            onChange={e => updateSelectedMaterial(e.target.value)}
                        >
                            {baseMaterials.map((material, index) =>
                                <MenuItem key={index} value={material.id}>{material.description}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div >
                    <Button onClick={() => saveMatItem()}
                        variant="contained"
                        className={classes.greenBG}
                    >
                        <AddIcon></AddIcon> Agregar material
                    </Button>
                    <Button onClick={() => handleModalClose()}
                        variant="contained"
                        color="secondary"
                        className={classes.m5}
                    >
                        Cerrar
                </Button>
                </div>
            </Dialog>
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

export default Combo;
