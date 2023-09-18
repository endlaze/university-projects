import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles, Dialog, TextField, Button, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles(() => ({
  input: {
    margin: '0px 20px 20px 20px',
    minWidth: 100
  },
  button: {
    margin: '15px 7px 15px 7px'
  },
  modalTitle: {
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold'
  },
  punct: {
    marginTop: 10,
    marginLeft: 20
  },
  punctLabel: {
    marginLeft: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: '1.1em'
  },
  ratingStars: {
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    margin: 10
  },

}));

const AddReviewModal = (props) => {
  const { open, onClose, product, idOrder } = props
  const classes = useStyles();
  const [added, setAdded] = useState(false)

  const labels = {
    1: 'Muy malo',
    2: 'Malo',
    3: 'Regular',
    4: 'Bueno',
    5: 'Excelente'
  };

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  const comment = useInput('')

  const submitReview = () => {
    axios.post('/order/review/', {
      order: idOrder,
      product: product,
      comment: comment.value,
      rating: value,
    }).then(() => {
      setAdded(true)
      comment.setValue('')
      handleClose(true)
    })
  }

  const handleClose = (added) => {
    onClose(added)
  }

  const handleChange = (setter, value) => {
    setter(value)
  }

  const validateForm = () => {
    return (comment.value && value) || false
  }

  return (
    <Dialog onClose={() => handleClose(added)} open={open}>
      <Typography variant="h5" className={classes.modalTitle}>Calificar producto</Typography>
      <div noValidate autoComplete="off">
        <div>
          <Typography variant="h6" className={classes.punct}>Puntuación</Typography>
          <div className={classes.ratingStars}>
            <Rating
              value={value}
              precision={1}
              onChange={(event, newValue) => {
                if (newValue) {
                  setValue(newValue);
                }
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
          </div>
        </div>
        <TextField label="Comentario" variant="outlined" {...comment} className={classes.input} />
      </div>
      <div>
        <Button onClick={() => submitReview()}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={validateForm() ? false : true}
        >
          Enviar reseña
        </Button>
        <Button onClick={() => handleClose(false)}
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Cancelar
        </Button>
      </div>
    </Dialog>
  );
}
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value: value,
    onChange: handleChange,
    setValue
  }
}

export default AddReviewModal;