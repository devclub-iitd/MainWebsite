import React, { useState } from 'react';
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
} from 'react-map-gl';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { MapMarker } from 'mdi-material-ui';
import { red } from '@material-ui/core/colors';

// to be replaced with devclub's token;
const ACCESS_TOKEN = 'pk.eyJ1Ijoic3ZnMTIzNDU2IiwiYSI6ImNqd291ZTV0bDBhOTczeW13emprMWFpZ20ifQ.RVNSN4qTOLs3FxUwO6npvA';

const navStyle = {
  position: 'absolute',
  bottom: '10%',
  right: '1%',
  padding: '10px',
};

export default function LocationMap() {
  const [viewport, setViewport] = useState({
    latitude: 28.544972,
    longitude: 77.190524,
    width: '100%',
    height: window.innerHeight,
    zoom: 10,
  });
  const [selected, setSelected] = useState(false);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={ACCESS_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onViewportChange={(viewport_) => {
        setViewport(viewport_);
      }}
    >
      <Marker
        key="marker"
        latitude={28.544972}
        longitude={77.190524}
      >
        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            setSelected(true);
          }}
        >
          <MapMarker style={{ color: red[500], fontSize: 65 }} />
        </IconButton>
      </Marker>

      {selected ? (
        <Popup
          latitude={28.544972}
          longitude={77.190524}
          onClose={() => {
            setSelected(null);
          }}
        >
          <Box m={2}>
            DevClub - IIT Delhi, Hauz Khas, New Delhi-110 016, India
          </Box>
        </Popup>
      ) : null}

      <div className="nav" style={navStyle}>
        <NavigationControl />
      </div>
    </ReactMapGL>
  );
}
