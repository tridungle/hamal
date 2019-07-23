import React, { Component } from "react";
import {
  FaTimes,
  FaTrafficLight,
  FaCloudSunRain,
  FaHeartbeat,
  FaHospital,
  FaPlaneDeparture,
  FaPills,
  FaMoneyBillAlt,
  FaFireExtinguisher
} from "react-icons/fa";

import { GiPoliceOfficerHead } from "react-icons/gi";
import { FiHome } from "react-icons/fi";
import { IoIosToday } from "react-icons/io";

import posed from "react-pose";

import SelectedAppUpdates from "./selectedApp/selectedAppUpdates";
import SelectedAppTraffic from "./selectedApp/selectedAppTraffic";
import SelectedAppWeather from "./selectedApp/selectedAppWeather";
import SelectedAppMada from "./selectedApp/selectedAppMada";
import SelectedAppAirports from "./selectedApp/selectedAppAirports";
import SelectedAppHospitals from "./selectedApp/selectedAppHospitals";
import SelectedAppPharmacies from "./selectedApp/selectedAppPharmacies";
import SelectedAppPolice from "./selectedApp/selectedAppPolice";
import SelectedAppFire from "./selectedApp/selectedAppFire";
import SelectedAppBanks from "./selectedApp/selectedAppBanks";
import SelectedAppDelete from "./selectedApp/selectedAppDelete";

import FadeIn from "react-fade-in";
import ReactTooltip from "react-tooltip";

const IconContainer = posed.div({
  selected: {
    margin: "7px",
    fontSize: "27px"
  },
  unselected: {
    margin: "0px",
    fontSize: "20px !important"
  }
});

const style = {
  cursor: "pointer"
};
export default class SelectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategory: "home",
      selectedAppInfo: undefined
    };
    this.updateHebrew = this.updateHebrew.bind(this);
    this.addPost = this.addPost.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
  }
  deleteApp(app) {
    this.props.deleteApp(app);
  }
  addPost(name, title, body) {
    this.props.addPost(name, title, body);
  }
  updateHebrew(name, param, newValue) {
    this.props.updateHebrew(name, param, newValue);
  }
  componentWillReceiveProps() {
    this.setState({ subCategory: "home" });
  }
  render() {
    let selectedAppInfo;
    for (var i = 0; i < this.props.apps.length; i++) {
      if (this.props.apps[i].appName === this.props.app) {
        selectedAppInfo = this.props.apps[i];
      }
    }
    return (
      <div class="mt-5">
        <FiHome
          onClick={() => this.props.changeApp("home")}
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
            fontSize: "20px"
          }}
        />
        <h1 class="mb-5" style={{ textAlign: "center" }}>
          {this.props.app}
        </h1>
        <hr style={{ borderTop: "1px solid white", padding: "0" }} />
        <div
          class="d-flex justify-content-center flex-wrap"
          style={{ fontSize: "20px" }}
        >
          <ReactTooltip effect="solid" />
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "home" ? "selected" : "unselected"
              }
            >
              <IoIosToday
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "home" })}
                data-tip="עדכונים"
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "traffic" ? "selected" : "unselected"
              }
            >
              <FaTrafficLight
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "traffic" })}
                data-tip="עומסי תנועה"
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "weather" ? "selected" : "unselected"
              }
            >
              <FaCloudSunRain
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "weather" })}
                data-tip="מזג אוויר"
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "hospitals"
                  ? "selected"
                  : "unselected"
              }
            >
              <FaHospital
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "hospitals" })}
                data-tip="רפואה באזור"
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "police" ? "selected" : "unselected"
              }
            >
              <GiPoliceOfficerHead
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "police" })}
                data-tip="משטרה באזור"
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "fire" ? "selected" : "unselected"
              }
            >
              <FaFireExtinguisher
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "fire" })}
                data-tip='כב"א באזור'
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "airports"
                  ? "selected"
                  : "unselected"
              }
            >
              <FaPlaneDeparture
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "airports" })}
                data-tip="שדות תעופה באזור"
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "pharmacies"
                  ? "selected"
                  : "unselected"
              }
            >
              <FaPills
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "pharmacies" })}
                data-tip="בתי מרקחת באזור"
              />
            </IconContainer>
          </FadeIn>
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "banks" ? "selected" : "unselected"
              }
            >
              <FaMoneyBillAlt
                class="ml-3 mr-3"
                style={style}
                onClick={() => this.setState({ subCategory: "banks" })}
                data-tip="בנקים באזור"
              />
            </IconContainer>
          </FadeIn>
          {selectedAppInfo.country === "Israel" ? (
            <React.Fragment>
              <FadeIn>
                <IconContainer
                  pose={
                    this.state.subCategory === "mada"
                      ? "selected"
                      : "unselected"
                  }
                >
                  <FaHeartbeat
                    class="ml-3 mr-3"
                    style={style}
                    onClick={() => this.setState({ subCategory: "mada" })}
                    data-tip='אירועי מד"א'
                  />
                </IconContainer>
              </FadeIn>
              <ReactTooltip effect="solid" />
            </React.Fragment>
          ) : null}
          <FadeIn>
            <IconContainer
              pose={
                this.state.subCategory === "delete" ? "selected" : "unselected"
              }
            >
              <FaTimes
                onClick={() => this.setState({ subCategory: "delete" })}
                class="ml-3 mr-3"
                style={{
                  cursor: "pointer"
                  // fontSize: "16px"
                }}
                data-tip='מחק חמ"ל'
              />
            </IconContainer>
          </FadeIn>
        </div>
        <hr style={{ borderTop: "1px solid white", padding: "0" }} />
        {this.state.subCategory === "home" ? (
          <SelectedAppUpdates
            addPost={this.addPost}
            selectedAppInfo={selectedAppInfo}
          />
        ) : this.state.subCategory === "traffic" ? (
          <SelectedAppTraffic selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "weather" ? (
          <SelectedAppWeather selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "mada" ? (
          <SelectedAppMada
            updateHebrew={this.updateHebrew}
            selectedAppInfo={selectedAppInfo}
          />
        ) : this.state.subCategory === "hospitals" ? (
          <SelectedAppHospitals selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "airports" ? (
          <SelectedAppAirports selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "pharmacies" ? (
          <SelectedAppPharmacies selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "banks" ? (
          <SelectedAppBanks selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "police" ? (
          <SelectedAppPolice selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "fire" ? (
          <SelectedAppFire selectedAppInfo={selectedAppInfo} />
        ) : this.state.subCategory === "delete" ? (
          <SelectedAppDelete
            deleteApp={this.deleteApp}
            selectedAppInfo={selectedAppInfo}
          />
        ) : null}
      </div>
    );
  }
}
