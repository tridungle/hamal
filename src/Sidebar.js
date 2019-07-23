import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import FadeIn from "react-fade-in";
import "bootstrap/dist/css/bootstrap.css";

export default class Sidebar extends Component {
  render() {
    return (
      <nav id="sidebar">
        <ul
          class="list-unstyled components"
          style={{ marginTop: "0", paddingTop: "0" }}
        >
          <li
            style={{
              cursor: "pointer",
              fontSize: "0.9em"
            }}
            onClick={() => this.props.changeApp("home")}
          >
            <a href="#0">חמ"ל אגמים</a>
          </li>
          <li
            style={{ cursor: "pointer" }}
            onClick={() => this.props.changeApp("add")}
          >
            <a href="#0">
              <FaPlus style={{ fontSize: "0.7em" }} />
            </a>
          </li>
          {this.props.apps ? (
            <FadeIn>
              {this.props.apps.map(app => (
                <li
                  style={{
                    fontSize: "0.7em"
                  }}
                  key={Math.random()}
                >
                  <a
                    href="#0"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.props.changeApp(app.appName)}
                  >
                    {app.city}
                  </a>
                </li>
              ))}
            </FadeIn>
          ) : null}
        </ul>
      </nav>
    );
  }
}
