import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, makeStyles } from '@material-ui/core';
import EmployeeReportTable from '../components/EmployeeReportTable';


const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

const  EmployeeResport = () => {
    const classes = useStyles();
    return(
        <Container>
            <Box className={classes.paper}>
                <Typography variant="h2">
                Reporte por Empleado
                </Typography>
            </Box>
            <EmployeeReportTable/>
        </Container>
    )
}

export default EmployeeResport;