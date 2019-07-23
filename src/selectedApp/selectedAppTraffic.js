import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  TrafficLayer
} from "react-google-maps";
import FadeIn from "react-fade-in";

export default class SelectedAppTraffic extends Component {
  render() {
    const MapWithATrafficLayer = compose(
      withProps({
        googleMapURL:
          "https://maps.googleapis.com/maps/api/js?key= " +
          "ENTER GOOGLE API KEY" +
          "&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),

      withScriptjs,
      withGoogleMap
    )(props => (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: props.latitude, lng: props.longitude }}
      >
        <TrafficLayer autoUpdate />
      </GoogleMap>
    ));
    return (
      <FadeIn>
        <div>
          <MapWithATrafficLayer
            latitude={this.props.selectedAppInfo.latitude}
            longitude={this.props.selectedAppInfo.longitude}
            bounds={this.props.selectedAppInfo.bounds}
          />
        </div>
      </FadeIn>
    );
  }
}
