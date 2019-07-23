import React, { Component } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as animationData from "../jsons/hospital.json";
import PlaceComponent from "./placeComponent";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class SelectedAppHospitals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentDidMount() {
    fetch(
      `https://agamapi.azurewebsites.net/places/${
        this.props.selectedAppInfo.latitude
      },${this.props.selectedAppInfo.longitude}/hospital`
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ data: json });
      });
  }
  render() {
    if (this.state.data) {
      console.log(this.state.data);
    }
    return (
      <div>
        {this.state.data ? (
          <div class="mt-4 mb-4">
            {this.state.data.length > 0 ? (
              this.state.data.map(place => (
                <FadeIn key={Math.random()}>
                  <PlaceComponent data={place.result} />
                </FadeIn>
              ))
            ) : (
              <FadeIn>
                <h1>אין תוצאות</h1>
              </FadeIn>
            )}
          </div>
        ) : (
          <FadeIn>
            <Lottie options={defaultOptions} height={200} width={200} />
          </FadeIn>
        )}
      </div>
    );
  }
}
