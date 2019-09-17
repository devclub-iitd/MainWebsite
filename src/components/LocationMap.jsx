import React, { useState } from 'react';
import ReactMapboxGl, { Marker, Popup } from 'react-mapbox-gl';
import { MapMarker } from 'mdi-material-ui';
import Box from '@material-ui/core/Box';

const Map = ReactMapboxGl({
  // to be replaced with devclub's token;
  accessToken:
    'pk.eyJ1Ijoic3ZnMTIzNDU2IiwiYSI6ImNqd291ZTV0bDBhOTczeW13emprMWFpZ20ifQ.RVNSN4qTOLs3FxUwO6npvA',
});

const LocationMap = () => {
  const [selected, setSelected] = useState(false);
  return (
    <Map
    // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: window.innerHeight * (0.6),
        width: 'inherit',
      }}
      center={[77.190524, 28.544972]}
      zoom={[10]}
    >

      <Marker
        coordinates={[77.190524, 28.544972]}
        anchor="center"
        style={{ zIndex: 1 }}
        onClick={(e) => {
          e.preventDefault();
          setSelected(true);
        }}
      >
        <MapMarker style={{ fontSize: 50 }} />
      </Marker>
      {selected ? (
        <Popup
          style={{ zIndex: 1 }}
          coordinates={[77.190524, 28.544972]}
          onClose={() => {
            setSelected(null);
          }}
          offset={{
            'bottom-left': [12, -38], bottom: [0, -38], 'bottom-right': [-12, -38],
          }}
        >
          <Box m={2}>
            DevClub - IIT Delhi, Hauz Khas, New Delhi-110 016, India
          </Box>
        </Popup>
      ) : null}
    </Map>
  );
};


export default LocationMap;
