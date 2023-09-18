import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useStore } from '../Store'
import { Paper, Dialog, Table, TableHead, TableRow, TableBody, TableCell, Container, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios'

const useStyles = makeStyles({
  product: {
    maxWidth: 345,
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  },
  priceBefore: {
    textDecoration: "line-through",
    margin: '0 20px 0 0'
  },
  flex: {
    display: 'flex'
  },
  table: {
    
  },
  modalTitle: {
    textAlign: 'center',
    margin: 15,
    fontWeight: 'bold'
  },
  prodPic: {
    minHeight: 400,
    maxHeight: 400,
    display: 'block',
    margin: 'auto',
    borderRadius: '4px'
  },
  center:{
    display: 'block',
    margin: 'auto'
  }
  ,
  prodDetails: {
    marginTop: 15
  },
  ratingStars: {
    display: 'flex',
    alignItems: 'center',
    margin: 10
  },
  ratTitle: {
    fontWeight: "bold"
  },
  comment: {
    marginLeft: 8
  },
  ratingWrapper: {
    margin:5,
    background: '#f8f1da',
    borderBottom: '2px solid #EBEBEB'
  },
  cont: {
  
  },
  dialogWidth:{
    minWidth:700
  }
});

const ShowProduct = ({ products, show, closeModal, product, fullProduct }, props) => {
  const [store, dispatch] = useStore();
  const [reviews, setReviews] = useState([])
  const classes = useStyles();
  const labels = {
    1: 'Muy malo',
    2: 'Malo',
    3: 'Regular',
    4: 'Bueno',
    5: 'Excelente'
  };

  const [itemsTCols, setItemsTableCols] = useState([
    { title: 'Cantidad' },
    { title: 'Tipo de mueble' },
    { title: 'Materiales' },
  ])

  useEffect(() => {
    axios.get('/order/review/').then((res) => {
      let filtered = res.data.filter((rev) => parseInt(rev.product) === parseInt(product))
      setReviews(filtered)
    })

  }, [product])

  return (
    <>
      <Dialog onClose={() => closeModal()} open={show} maxWidth="md" scroll='body'>
        <div className ={classes.dialogWidth}>
        <Container>
          <Typography variant="h5" className={classes.modalTitle}>{fullProduct.title}</Typography>
          <img className={classes.prodPic} src={fullProduct.picture}></img>
          <Typography variant="h6" className={classes.prodDetails}>Detalles del producto</Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {itemsTCols.map((itemCol, index) =>
                  <TableCell key={index}>{itemCol.title}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(item =>
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography>{item.quantity || 1}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{item.furn_type.description}</Typography>
                  </TableCell>
                  <TableCell>
                    {item.materials.map((material, index) =>
                      <Typography key={index}>- {material.description}</Typography>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </Container>
          <Container>

          <Typography variant="h6" className={classes.prodDetails}>Valoraciones del producto</Typography>
          {reviews.map((rev, index) => (

            <div key={index} className={classes.ratingWrapper}>
              <Typography className={classes.ratTitle}>Calificación</Typography>
              <div className={classes.ratingStars}>
                <Rating name="read-only" value={rev.rating} readOnly />
                {rev.rating !== null && <Box ml={2}>{labels[rev.rating]}</Box>}
              </div>

              <Typography className={classes.comment}>{rev.comment}</Typography>

            </div>
          ))}
        </Container>
        </div>
      </Dialog>
    </>
  );
}

export default ShowProduct;