import React, { Component } from "react";
import Lottie from "react-lottie";
import * as animationData from "./jsons/world.json";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import FadeIn from "react-fade-in";
import { FaPlus } from "react-icons/fa";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class HomeApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      something: undefined
    };
  }
  render() {
    return (
      <div class="mt-5 mb-5">
        <div onClick={() => this.props.changeApp("home")}>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
        <h1 style={{ textAlign: "center" }}>חמ"ל אגמים</h1>
        <div
          style={{ cursor: "pointer" }}
          class="btn btn-outline-light mt-4 font-weight-bold"
          onClick={() => {
            this.props.changeApp("add");
          }}
        >
          חמ"ל חדש <FaPlus style={{ marginRight: "5px" }} />
        </div>
        {this.props.apps.length > 0 ? (
          <div>
            <div
              class="mt-5 p-2 font-weight-bold"
              style={{
                borderTop: "1px solid white",
                borderLeft: "1px solid white",
                borderRight: "1px solid white"
              }}
            >
              בחר חמ"ל
            </div>
            <div class="pl-3 pr-3" style={{ border: "1px solid white" }}>
              <FadeIn>
                {this.props.apps.map(app => (
                  <div
                    key={Math.random()}
                    class="btn btn-light mt-3 mb-3 btn-block font-weight-bold hoverMe"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.changeApp(app.appName)}
                  >
                    {app.appName}
                  </div>
                ))}
              </FadeIn>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
