import React from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import FurnitureForm from '../components/AddFurniture'
import EmployeeForm from '../components/AddEmployee'
import store from 'store'
import Report from '../components/Report'
import ComboForm from '../components/AddCombo'
import AddPromotion from '../components/AddPromotion'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	brd: {

		borderBottom: '1px solid #dbdbdb',
		padding: 20
	},
	coloredBr: {
		borderBottom: '1px solid #dbdbdb',
		padding: 20,
		background: '#f5ebf7'
	}
}));
const Home = () => {
	const { login_type, workplace } = store.get('user')


	const classes = useStyles();
	return (
		<>
			{login_type !== 'manager' ?
				<>
					<Header />
					<ProductList></ProductList>
				</>
				:
				<>
					<div className={classes.brd}>
						<EmployeeForm />
					</div>
					<div className={classes.coloredBr} >
						<FurnitureForm />
					</div>
					<div className={classes.brd} >
						<ComboForm />
					</div>
					<div className={classes.coloredBr} >
						<AddPromotion />
					</div>
					<div className={classes.brd} >
						<Report branch={workplace.id}></Report>
					</div>
				</>
			}

		</>
	);
}

export default Home;