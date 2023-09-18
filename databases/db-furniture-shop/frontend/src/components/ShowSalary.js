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

const ShowSalary = ({ show, closeModal }, props) => {
    const classes = useStyles();
    const user = store.get('user')
    const [salary, setSalary] = useState({})

    useEffect(() => {
        if (!show) return;

        axios.post('/employee/calculate-salary/',
            {
                idSucursal: user.idSucursal,
                cedulaEmpleado: user.cedulaEmpleado
            }).then((res) => {
                setSalary(res.data.pop())
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
                            <Typography variant="h6">Salario base: </Typography> <span>&nbsp;&nbsp; {salary.salario} </span>
                        </div>
                        <div className={classes.labels}>
                            <Typography variant="h6">Comisión: </Typography> <span>&nbsp;&nbsp; {salary.comisionGanada} </span>
                        </div>
                        <div className={classes.labels}>
                            <Typography variant="h6">Salario total: </Typography> <span>&nbsp;&nbsp; {parseInt(salary.totalSalario)} </span>
                        </div>
                    </Container>
                </div>
            </Dialog>
        </>
    );
}

export default ShowSalary;