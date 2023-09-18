import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import {useStore} from '../Store'
import { Paper } from '@material-ui/core';
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
  }
});

const Product = ({title, description, price, available_quantity, product, selling_price, showModal, products}, props) => {
  const [store, dispatch] = useStore();
  const classes = useStyles();

  return (
    <Card className={classes.product} {...props}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="200"
          image={product.foto || "https://politify.us/wp-content/uploads/2018/11/mesas-de-madera-para-comedor-arquitectura-casas.jpg"}
          title={title}
        />
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
            {product.codigoProducto}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {product.titulo}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {product.precio}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
            {product.descripcion}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {product.detalle}
          </Typography>

          
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
        onClick={()=> dispatch({type: 'add-to-cart', furniture: product})}
        variant="contained"
        color="primary"
        startIcon={<AddShoppingCart/>}>
          Agregar al carrito
        </Button>
        <Button onClick={()=> showModal(product)}>Detalles</Button>
      </CardActions>
    </Card>
  );
}

export default Product;