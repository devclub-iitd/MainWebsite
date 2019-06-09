import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const marker = require('../media/marker.png');

// to be replaced with devclub's token;
const ACCESS_TOKEN = 'pk.eyJ1Ijoic3ZnMTIzNDU2IiwiYSI6ImNqd291ZTV0bDBhOTczeW13emprMWFpZ20ifQ.RVNSN4qTOLs3FxUwO6npvA';

export default function LocationMap() {
  const [viewport, setViewport] = useState({
    latitude: 28.544972,
    longitude: 77.190524,
    width: '100%',
    height: 450,
    zoom: 10,
  });
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker
          latitude={28.544972}
          longitude={77.190524}
        >
          <ButtonBase
            onClick={(e) => {
              e.preventDefault();
              setSelected(true);
            }}
          >
            <img src={marker} alt="" />
          </ButtonBase>
        </Marker>

        {selected ? (
          <Popup
            latitude={28.544972}
            longitude={77.190524}
            onClose={() => {
              setSelected(null);
            }}
          >
            <Typography>
              IIT Delhi
            </Typography>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
