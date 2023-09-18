import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Dialog, Container } from '@material-ui/core';
import axios from 'axios'
import store from 'store'

const useStyles = makeStyles({
    flex: {
        display: 'flex'
    },
    modalTitle: {
        textAlign: 'center',
        margin: 15,
        fontWeight: 'bold'
    },
    center: {
        display: 'block',
        margin: 'auto'
    },
    dialogWidth: {
        minWidth: 400,
        padding: 30
    },
    salaryLbl: {

    },
    labels: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10
    },
});

const ShowProduct = ({ show, closeModal }, props) => {
    const classes = useStyles();
    const user = store.get('user')
    const [comm, setComm] = useState(0)
    const [t_sales, setTSales] = useState(0)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    useEffect(() => {
        if (!show) return;

        axios.get('/order/onsite/').then((res) => {

            let startDate = new Date();
            startDate.setDate(1)
            startDate.setHours(0, 0, 0, 0);
            console.log(startDate)


            // new Date(promotion.final_date + "T00:00:00") >= new Date())
            const percentage = parseFloat(user.emp_type.commission[0].percentage)
            let commission = 0
            let total_sales = 0
            let filtered = res.data.filter((ord) => (parseInt(ord.employee) === parseInt(user.id)) && (new Date(ord.date) >= startDate))
            console.log(filtered)

            if (filtered.length !== 0) {
                let totalSales = filtered.map(sale => parseFloat(sale.final_selling))
                total_sales = parseFloat(totalSales.reduce(reducer))
                commission = total_sales * percentage
            }
            setComm(commission)
            setTSales(total_sales)
        })

    }, [show])

    return (
        <>
            <Dialog onClose={() => closeModal()} open={show} maxWidth="sm" scroll='body'>
                <div className={classes.dialogWidth}>
                    <Container>
                        <Typography variant="h5" className={classes.modalTitle}>Ver salario</Typography>
                    </Container>
                    <Container>
                        <div className={classes.labels}>
                            <Typography variant="h6">Salario base: </Typography> <span>&nbsp;&nbsp; {user.salary} </span>
                        </div>
                        <div className={classes.labels}>
                            <Typography variant="h6">Total ventas: </Typography> <span>&nbsp;&nbsp; {t_sales} </span>
                        </div>
                        <div className={classes.labels}>
                            <Typography variant="h6">Comisión: </Typography> <span>&nbsp;&nbsp; {comm} </span>
                        </div>
                        <div className={classes.labels}>
                            <Typography variant="h6">Salario total: </Typography> <span>&nbsp;&nbsp; {parseFloat(user.salary) + comm} </span>
                        </div>
                    </Container>
                </div>
            </Dialog>
        </>
    );
}

export default ShowProduct;