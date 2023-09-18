import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useStore } from '../Store'
import { Dialog, Container, Box } from '@material-ui/core';
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
  center: {
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
    marginLeft: 8,
    marginBottom: 8
  },
  ratingWrapper: {
    margin: 5,
    background: '#f8f1da',
    borderBottom: '2px solid #EBEBEB'
  },
  cont: {

  },
  dialogWidth: {
    minWidth: 700
  },
  prodPic: {
    minHeight: 350,
    maxHeight: 350,
    display: 'block',
    margin: 'auto',
    borderRadius: '4px'
  },
});

const ShowProduct = ({ product, show, closeModal }, props) => {

  const [store, dispatch] = useStore();
  const classes = useStyles();
  const [reviews, setReviews] = useState([])
  const labels = {
    1: 'Muy malo',
    2: 'Malo',
    3: 'Regular',
    4: 'Bueno',
    5: 'Excelente'
  };

  useEffect(() => {
    if (!show) return;

    axios.post('/product/review/all',
      {
        codigoProducto: product.codigoProducto
      }).then((res) => {
        setReviews(res.data ? res.data : [])
      })

  }, [show])

  return (
    <>
      <Dialog onClose={() => closeModal()} open={show} maxWidth="md" scroll='body'>
        <div className={classes.dialogWidth}>
          <Container>
            <Typography variant="h5" className={classes.modalTitle}>{product.titulo}</Typography>
            <img className={classes.prodPic} src={product.foto || "https://politify.us/wp-content/uploads/2018/11/mesas-de-madera-para-comedor-arquitectura-casas.jpg"}></img>
            <Container>
              <Typography variant="h6" className={classes.prodDetails}>Información del producto</Typography>
              <Typography variant="h6" className={classes.prodDetails}>- Descripcion: </Typography>
              <div className={classes.comment}>{product.descripcion}</div>
              <Typography variant="h6" className={classes.prodDetails}>- Detalles: </Typography>
              <div className={classes.comment}>{product.detalle}</div>
            </Container>
            <Container>
              <Typography variant="h6" className={classes.prodDetails}>Reseñas del producto</Typography>
              {
                (reviews.length > 0) ?
                  <>
                    {reviews.map((rev, index) => (
                      <div key={index} className={classes.ratingWrapper}>
                        <Typography className={classes.ratTitle}>Calificación</Typography>
                        <div className={classes.ratingStars}>
                          <Rating name="read-only" value={rev.puntuacion} readOnly />
                          {rev.puntuacion !== null && <Box ml={2}>{labels[rev.puntuacion]}</Box>}
                        </div>
                        <Typography className={classes.comment}>{rev.comentario}</Typography>
                      </div>
                    ))}
                  </> : <div className={classes.comment}>No hay reseñas del producto </div>
              }
            </Container>
          </Container>
        </div>
      </Dialog>
    </>
  );
}

export default ShowProduct;