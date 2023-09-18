ACCESS_TOKEN = 'pk.eyJ1IjoiZW5kbGF6ZSIsImEiOiJjazU0bTF5eDIwYWt3M2RzYmVvbzVxdHU5In0.b9OJsu59epEMOO5K-Kx12g';
MAP_TILE_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;
MAP_ID = 'app_map'
CLUSTER_MAP_ID = 'cluster_map'
INITIAL_COORDS = [9.86943, -83.90449];
ZOOM_LEVEL = 13;
POINTS = [];

waypoints = [];
waypointsCaption = [];
waypointsIcons = [];

$.getJSON("points.json", (data) => {
  POINTS = data.points;
});

// Funcion para crear un mapa
createMap = (mapId, coordinates, zoomLevel) => {
  return L.map(mapId).setView(coordinates, zoomLevel);
}

// Funcion para crear la plantilla del mapa
createMapTile = () => {
  return L.tileLayer(MAP_TILE_URL, {
    maxZoom: 18,
    accessToken: ACCESS_TOKEN
  });
}

// Funcion para preparar los waypoints del mapa contenidos en el JSON
prepareWaypoints = () => {
  POINTS.forEach(point => {
    waypoints.push(point.coordinates);
    waypointsCaption.push(`<b>${point.name}</b><br>${point.info}`)
    waypointsIcons.push(point.icon)
  });
}

// Crear mapa con la ruta y puntos definidos
createMapWithRoute = () => {
  map = createMap(MAP_ID, INITIAL_COORDS, ZOOM_LEVEL);
  createMapTile().addTo(map);

  geocoder = L.Control.Geocoder.nominatim();
  routingPlan = L.Routing.plan(waypoints, {
    createMarker: (index, waypoint) => {
      if (waypoints[0]) {
        return L.marker(waypoint.latLng, {
          draggable: false
        }).bindPopup(waypointsCaption[index]).openPopup();
      }
    },
    geocoder: geocoder,
    routeWhileDragging: false
  });

  routeControl = L.Routing.control({
    plan: routingPlan,
    addWaypoints: false
  }).addTo(map);
}

// Crear mapa con el cluster de marcadores
createMapWithMarks = () => {
  clusterMap = createMap(CLUSTER_MAP_ID, INITIAL_COORDS, ZOOM_LEVEL);
  createMapTile().addTo(clusterMap);

  var markerCluster = L.markerClusterGroup();

  waypoints.forEach((waypoint, index) => {
    markerIcon = L.icon({
      iconUrl: `/portafolio-web/src/pages/lab2/icons/${waypointsIcons[index]}`,
      iconSize: [52, 52]
    })
    marker = L.marker(waypoint, { title: `Lat: ${waypoint[0]}, Long: ${waypoint[1]}`, icon: markerIcon });
    markerCluster.addLayer(marker);
  });

  clusterMap.addLayer(markerCluster);

}

$(window).on('load', () => {
  prepareWaypoints();
  createMapWithRoute();
  createMapWithMarks();
})