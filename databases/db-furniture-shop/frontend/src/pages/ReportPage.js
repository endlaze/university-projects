import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, makeStyles } from '@material-ui/core';
import Report from '../components/Report';


const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }));

const  ReportPage = () => {
    const classes = useStyles();
    return(
        <Container>
            <Box className={classes.paper}>
                <Typography variant="h2">
                Reporte General
                </Typography>
            </Box>
            <Report/>
        </Container>
    )
}

export default ReportPage;
