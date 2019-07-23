import React, { Component } from "react";
import FadeIn from "react-fade-in";
import citiesList from "../jsons/citiesList";
import Autosuggest from "react-autosuggest";
import Lottie from "react-lottie";
import * as animationData from "../jsons/health.json";
import "../App.css";
import moment from "moment/min/moment-with-locales";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === "") {
    return [];
  }

  const regex = new RegExp("^" + escapedValue, "i");

  return citiesList.filter(city => regex.test(city));
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>;
}

export default class SelectedAppMada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hebrew: undefined,
      data: undefined,
      value: "",
      suggestions: []
    };
    this.fetchData = this.fetchData.bind(this);
  }
  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  componentWillMount() {
    if (this.props.selectedAppInfo.hebrew) {
      this.setState({ hebrew: true });
    }
  }
  componentDidMount() {
    if (this.props.selectedAppInfo.hebrew) {
      fetch(`https://agamapi.azurewebsites.net/hazala/hours/24`)
        .then(response => response.json())
        .then(json => {
          var newJson = [];
          for (var i = 0; i < json.length; i++) {
            if (json[i].City === this.props.selectedAppInfo.hebrew) {
              newJson.push(json[i]);
            }
          }
          var reversedJson = newJson.reverse();
          this.setState({ data: reversedJson });
        });
    } else {
      this.setState({ hebrew: false });
    }
  }

  fetchData() {
    this.setState({ hebrew: true });
    fetch(`https://agamapi.azurewebsites.net/hazala/hours/24`)
      .then(response => response.json())
      .then(json => {
        var newJson = [];
        for (var i = 0; i < json.length; i++) {
          if (json[i].City === this.props.selectedAppInfo.hebrew) {
            newJson.push(json[i]);
          }
        }
        var reversedJson = newJson.reverse();
        this.setState({ data: reversedJson });
      });
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "חפש עיר",
      value,
      onChange: this.onChange
    };
    return (
      <div>
        <FadeIn>
          {!this.state.hebrew ? (
            <div class="App-header2">
              <Lottie options={defaultOptions} height={150} width={150} />
              <h4 class="mb-4">יש להגדיר עיר בישראל (בעברית!)</h4>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />
              <div
                style={{ cursor: "pointer" }}
                class="btn btn-outline-light mt-4 font-weight-bold"
                onClick={() => {
                  if (this.state.value !== "") {
                    this.props.updateHebrew(
                      this.props.selectedAppInfo.appName,
                      "hebrew",
                      this.state.value
                    );
                    this.fetchData();
                  }
                }}
              >
                בחר עיר
              </div>
            </div>
          ) : this.state.hebrew && this.state.data ? (
            <div class="mt-4">
              <FadeIn>
                {this.state.data.map(item => (
                  <a
                    href={`https://www.google.com/maps?q=${item.Latitude},${
                      item.Longitude
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={Math.random()}
                    class="customWrapper d-flex justify-content-between"
                    style={{
                      width: "100%",
                      margin: "0",
                      padding: "0",
                      cursor: "pointer"
                    }}
                  >
                    <p style={{ padding: "0", margin: "0" }}>
                      {moment(item.EventTime)
                        .locale("he")
                        .fromNow()}
                    </p>
                    <p style={{ padding: "0", margin: "0" }}>
                      {item.Cause !== "" ? item.Cause : "?"}
                    </p>
                    <p style={{ padding: "0", margin: "0" }}>{item.City}</p>
                  </a>
                ))}
              </FadeIn>
            </div>
          ) : (
            <Lottie options={defaultOptions2} height={150} width={150} />
          )}
        </FadeIn>
      </div>
    );
  }
}
