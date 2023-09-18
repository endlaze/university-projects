import React, { useEffect, useState } from 'react'
import Product from './Product'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import axios from 'axios'
import ShowProduct from './ShowProduct';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import store from 'store'
import ShowSalary from './ShowSalary'

const useStyles = makeStyles({
  productContainer: {
    marginTop: '50px'
  },
  product: {
    margin: 'auto',
    marginTop: '20px'
  },
  salaryBtn: {
    float: 'right',
    margin: 20
  },
  mtSpacing: {
	  marginTop: 40,
	}
})

const ProductList = () => {
  const { emp_type } = store.get('user')

  const classes = useStyles();
  const [furnitures, setFurnitures] = useState([])
  const [combos, setCombos] = useState([])
  const [combosStock, setCombosStock] = useState([])
  const [furnitureStock, setFurnitureStock] = useState([])
  const [promotions, setPromotions] = useState([])
  const [products, setProducts] = useState([])
  const [fullProduct, setFullProduct] = useState({})
  const [modal, setModal] = useState(false)
  const [product, setProduct] = useState(0)
  const [salaryModal, setSalaryModal] = useState(false)

  useEffect(() => {
    axios.get('/product/furniture/').then((fornitures) => {
      setFurnitureStock(fornitures.data)
    })
    axios.get('/product/promotion/').then((promotions) => {
      setPromotions(promotions.data)
    })
    axios.get('/product/furniture_combo/').then((combos) => {
      setCombosStock(combos.data)
    })
  }, [])


  useEffect(() => {
    if (furnitureStock.length !== 0) {
      applyDiscounts(setFurnitures, furnitureStock)
    }
    if (combosStock.length !== 0) {
      applyDiscounts(setCombos, combosStock)
    }
  }, [combosStock, promotions, furnitureStock])


  const applyDiscounts = (setter, stockList) => {
    setter(stockList.map((furniture) => {
      let furn = applyDiscount(furniture)
      return furn
    }))
  }

  const applyDiscount = (product) => {
    let discount = 0
    let selling = parseInt(product.price)
    let promotion = promotions.find((promotion) => parseInt(promotion.product) === parseInt(product.id) &&
      new Date(promotion.final_date + "T00:00:00") >= new Date())

    if (promotion !== undefined) {
      discount = parseFloat(promotion.discount)
      selling = selling * (1 - discount)
    }

    return { ...product, discount: discount, selling_price: selling }

  }

  const showModal = (products, productId, fullProd) => {
    setProducts(products)
    setProduct(productId)
    setFullProduct(fullProd)
    setModal(true)
  }


  const changeSalaryModalState = () => {
    setSalaryModal(!salaryModal)
  }


  const closeModal = () => {
    setModal(false)
  }

  return (
    <>
      <div>
        {((emp_type !== undefined) && (emp_type.id === 1)) ?
          <Button
            className={classes.salaryBtn}
            onClick={() => changeSalaryModalState()}
            variant="contained"
            color="primary"
            startIcon={<AttachMoneyIcon />}>
            Ver salario
        </Button> : null}
      </div>
      <Container className={classes.productContainer}>
        <Typography variant="h2" gutterBottom className={classes.mtSpacing}> Nuestros productos</Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.productContainer}>
          {furnitures.map((product, index) =>
            <Product showModal={showModal} fullProduct={product} products={[product]} key={index} {...product} product={product} selling_price={product.selling_price}></Product>
          )}
        </Box>
        <Typography variant="h2" gutterBottom className={classes.mtSpacing}> Combos </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" className={classes.productContainer}>
          {combos.map((product, index) =>
            <Product showModal={showModal} fullProduct={product} products={product.combo_products} key={index} {...product} product={product} selling_price={product.selling_price}></Product>
          )}
        </Box>
        <ShowProduct product={product} closeModal={closeModal} show={modal} products={products} fullProduct={fullProduct} />
        <ShowSalary closeModal ={changeSalaryModalState} show={salaryModal}/>
      </Container>
    </>

  );
}

export default ProductList;