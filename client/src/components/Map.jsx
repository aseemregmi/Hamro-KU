import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCurrentPosition } from './../helperFunctions';
import axios from 'axios';
import DepartmentPin from './utility/DepartmentPin';
import CurrentLocation from './utility/CurrentLocation';

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
      popup: null,
      departments: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/departments')
      .then(res => {
        console.log(res.data);
        this.setState({ departments: res.data });
      })
      .catch(err => console.log(err));

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
    // clearInterval(this.interval);
  }

  handleMarkerClick = e => {};

  render() {
    const { departments } = this.state;
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/navigation-guidance-day-v4"
      >
        {departments.length > 0
          ? departments.map(department => (
              <Marker
                longitude={parseFloat(department.lattitude)}
                latitude={parseFloat(department.longitude)}
                key={department.lattitude}
              >
                <DepartmentPin
                  size={20}
                  onClick={() => this.setState({ popup: department })}
                />
              </Marker>
            ))
          : null}
        {this.state.popup ? (
          <Popup
            tipSize={5}
            anchor="top"
            latitude={this.state.popup.longitude}
            longitude={this.state.popup.lattitude}
            closeOnClick={false}
            onClose={() => this.setState({ popup: null })}
          >
            {this.state.popup.description}
          </Popup>
        ) : null}
        <Marker {...this.state.position}>
          <CurrentLocation />
        </Marker>
      </ReactMapGL>
    );
  }
}

export default Map;

// {departments.length > 0
//   ? departments.map(department => (
//       // <Marker
//       //   key={department._id}
//       //   longitude={parseInt(department.longitude)}
//       //   latitude={parseInt(department.latitude)}
//       // >
//       //   <DepartmentPin
//       //     size={20}
//       //     onClick={() => this.setState({ popupInfo: department })}
//       //   />
//       // </Marker>

//       <Marker
//         key={department._id}
//         longitude={27.619295}
//         latitude={85.538625}
//       >
//         a
//         {/* <DepartmentPin
//           size={20}
//           // onClick={() => this.setState({ popupInfo: department })}
//         /> */}
//       </Marker>
//     ))
//   : null}
