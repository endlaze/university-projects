import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link, useHistory} from 'react-router-dom'
import {useStore} from '../Store'
import stores from 'store'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: '#333 !important'
  },
  link: {
    textDecoration: 'none',
    flexGrow: 1,
    color: 'white',
    margin: theme.spacing(0, 1)
  }
}));


const AppNavbar = () => {
  const [store, dispatch] = useStore();
  const classes = useStyles();
  const history = useHistory();
  const {login_type} = stores.get('user')

  const logout = () => {
    stores.clearAll()
    history.replace('/login')
  }
  return(
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Link className={classes.link} to="/">
          <Typography  variant="h6" >
            MueblesTEC
          </Typography>
          </Link>
          <Link to="/orders">
          <Typography className={classes.link} variant="h6" >
            Ordenes
          </Typography> 
          </Link>
          <Link to="/checkout">
          <Typography className={classes.link} variant="h6" >
            Carrito {store.cart.length}
          </Typography> 
          </Link>
          {login_type === 'client'? 
            <Link to="/profile">
            <Typography className={classes.link} variant="h6" >
              Perfil
            </Typography> 
            </Link>
            :
            <>
            </>
          }
          <Button onClick={()=>logout()}color="inherit">Salir</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;