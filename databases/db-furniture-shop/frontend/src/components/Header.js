import React from 'react'
import { makeStyles } from '@material-ui/core';
const useStytles = makeStyles({
	mainHeader: {
		backgroundImage: 'url("https://www.mueblesdiaz.com/wp-content/uploads/2017/04/2372.jpg")',
		filter: 'blur(8px)',
		height: '600px', 
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
	},
	mainHeaderText: {
		backgroundColor: 'rgb(0,0,0)', /* Fallback color */
		backgroundColor: 'rgba(0,0,0, 0.4)', /* Black w/opacity/see-through */
		color: 'white',
		fontWeight: 'bold',
		border: '3px solid #f1f1f1',
		position: 'absolute',
		top: '30%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		zIndex: '2',
		width: '80%',
		padding:' 20px',
		textAlign: 'center',
	},
	
	mainHeaderFooter: {
		backgroundColor: '#333',
		height: '50px',
		marginTop: '-5px',
		zIndex: '2',
		position: 'relative',
	}
})
const Header = () => {
	const classes = useStytles()
	return (
			<div>
				<div className={classes.mainHeader}></div>
				<div className={classes.mainHeaderText}>
					<h1>Bienvenido a nuestra pagina</h1>
					<p>Tenemos la mas amplia variedad en muebles de la mas alta calidad.</p>
				</div>
				<div className={classes.mainHeaderFooter}></div>
			</div>
	);
}

export default Header;