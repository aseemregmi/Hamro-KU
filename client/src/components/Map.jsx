import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

const TOKEN =
  'pk.eyJ1IjoiYXNlZW1yZWdtaSIsImEiOiJjam1lbmVrZzcyZHNjM3ZudGhjOW96a2Q2In0.T_c3K15I9NcPBBPKcTrAjw';

class Map extends Component {
  state = {
    viewport: {
      width: 1000,
      height: 600,
      latitude: 27.619295,
      longitude: 85.538625,
      zoom: 17
    }
  };

  handleMarkerClick = e => {
    console.log('Hi');
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={TOKEN}
      >
        <Popup
          latitude={27.619967}
          longitude={85.538508}
          closeButton={true}
          anchor="top"
        >
          <div>You are here</div>
        </Popup>
      </ReactMapGL>
    );
  }
}

export default Map;
