import React from 'react'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import FurnitureForm from '../components/AddFurniture'
import EmployeeForm from '../components/AddEmployee'
import store from 'store'
import Report from '../components/Report'

const Home = () => {
	console.log(store.get('user'))
	const {login_type, workplace} = store.get('user')
	console.log(login_type)
	return (
			<>
				{login_type !== 'manager' ?
					<>
					<Header/>
					<ProductList></ProductList>
					</>
				:
				<>
					<EmployeeForm/>
					<FurnitureForm/>
					<Report branch={workplace.id}></Report>
				</>
				}
				
			</>
	);
}

export default Home;