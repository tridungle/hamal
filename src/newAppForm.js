import React, { Component } from "react";
import FadeIn from "react-fade-in";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import "./App.css";
import Lottie from "react-lottie";
import * as animationData from "./jsons/search.json";
import { FiHome } from "react-icons/fi";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const MY_API_KEY = "ENETER GOOGLE API KEY";

export default class NewAppForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      value: "",
      selected: undefined,
      newAppInput: undefined
    };
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value, value: e.target.value });
  };
  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    this.setState({
      search: "",
      value: geocodedPrediction.formatted_address,
      selected: true
    });
  };
  handleNoResult = () => {
    console.log("No results for ", this.state.search);
  };
  handleStatusUpdate = status => {
    //console.log(status);
  };

  render() {
    const { search, value } = this.state;

    return (
      <FadeIn>
        <FiHome
          onClick={() => this.props.changeApp("home")}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
            fontSize: "20px",
            zIndex: "10000"
          }}
        />
        <div class="mt-5" dir="ltr">
          <Lottie options={defaultOptions} height={200} width={200} />

          <GoogleMapLoader
            params={{
              key: MY_API_KEY,
              libraries: "places,geocode"
            }}
            render={googleMaps =>
              googleMaps && (
                <GooglePlacesSuggest
                  googleMaps={googleMaps}
                  displayPoweredByGoogle={false}
                  autocompletionRequest={{
                    input: search
                    // Optional options
                    // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                  }}
                  // Optional props
                  onNoResult={this.handleNoResult}
                  onSelectSuggest={this.handleSelectSuggest}
                  onStatusUpdate={this.handleStatusUpdate}
                  textNoResults="No results." // null or "" if you want to disable the no results item
                  customRender={prediction => (
                    <div
                      className="customWrapper"
                      style={{
                        color: "white",
                        backgroundColor: "#282c34",
                        textAlign: "left",
                        padding: "5px"
                      }}
                    >
                      {prediction ? prediction.description : "No results."}
                    </div>
                  )}
                >
                  <input
                    style={{
                      padding: "5px",
                      backgroundColor: "#282c34",
                      color: "white",
                      border: "1px solid white"
                    }}
                    type="text"
                    value={value}
                    placeholder="Search a location..."
                    onChange={this.handleInputChange}
                  />
                </GooglePlacesSuggest>
              )
            }
          />
        </div>
        {this.state.selected ? (
          <FadeIn>
            <div
              style={{ cursor: "pointer" }}
              class="btn btn-outline-light mt-4 font-weight-bold"
              onClick={() => {
                this.props.newApp(this.state.value);
              }}
            >
              הקמת חמ"ל חדש
            </div>
          </FadeIn>
        ) : null}
      </FadeIn>
    );
  }
}
