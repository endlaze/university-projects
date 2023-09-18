import React, { useState, useEffect } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Typography, Grid } from '@material-ui/core'


const MyMap = ({change}) => {


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }, [])

  const [state, setState] = useState({
    lat: 0,
    lng: 0
  })

  useEffect(()=>{
    change(state)
  }, [state])
  
  const handleClick = (click) => {
    setState({
      lat: click.latlng.lat,
      lng: click.latlng.lng
    })
  }
  return (
    <>
     <Grid item xs={12}>
     <Typography>Latitud: {state.lat} </Typography>
     </Grid>
     <Grid item xs={12}>
     <Typography>Longitud: {state.lng}</Typography>
     </Grid>
    <Map center={[state.lat, state.lng]} zoom={13} onclick={handleClick}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      <Marker position={[state.lat, state.lng]}>
        <Popup>Mi ubicacion</Popup>
      </Marker>
    </Map>
    </>
  );

}

export default MyMap;