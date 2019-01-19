import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCurrentPosition } from './../helperFunctions';

const TOKEN =
  'pk.eyJ1IjoiYXNlZW1yZWdtaSIsImEiOiJjam1lbmVrZzcyZHNjM3ZudGhjOW96a2Q2In0.T_c3K15I9NcPBBPKcTrAjw';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 1000,
        height: 600,
        latitude: 27.619295,
        longitude: 85.538625,
        zoom: 17
      },
      position: { latitude: 27.619295, longitude: 85.538625 },
      displayPopup: false
    };
  }

  componentDidMount() {
    getCurrentPosition().then(position => {
      this.setState({
        viewport: {
          latitude: position.latitude,
          longitude: position.longitude,
          zoom: 17
        }
      });
    });

    this.interval = setInterval(() => {
      getCurrentPosition().then(position => {
        this.setState({
          position: {
            latitude: position.latitude,
            longitude: position.longitude
          }
        });
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleMarkerClick = e => {};

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={TOKEN}
      >
        <Popup {...this.state.position} closeButton={false} anchor="top">
          <div>You are here</div>
        </Popup>
      </ReactMapGL>
    );
  }
}

export default Map;
