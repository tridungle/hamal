import React, { Component } from "react";
import PlaceComponentDetails from "./placeComponentDetails";
import { FaCaretDown, FaCaretUp, FaCircle } from "react-icons/fa";

export default class placeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }
  render() {
    return (
      <div class="m-2">
        <div
          onClick={() => this.setState({ clicked: !this.state.clicked })}
          style={{ cursor: "pointer" }}
          class="hoverMe btn btn-light btn-block font-weight-bold"
        >
          <div class="d-flex justify-content-between align-items-center">
            {!this.state.clicked ? (
              <div class="d-flex justify-content-center align-items-center">
                <FaCaretDown style={{ marginLeft: "5px", padding: "0" }} />
                {this.props.data.opening_hours ? (
                  <React.Fragment>
                    {this.props.data.opening_hours.open_now ? (
                      <div class="d-flex justify-content-center align-items-center">
                        <p
                          style={{
                            marginLeft: "5px",
                            marginTop: "0",
                            marginBottom: "0",
                            padding: "0"
                          }}
                        >
                          פתוח עכשיו
                        </p>
                        <FaCircle
                          style={{ color: "#50c878", fontSize: "12px" }}
                        />
                      </div>
                    ) : (
                      <div class="d-flex justify-content-center align-items-center">
                        <p
                          style={{
                            marginLeft: "5px",
                            marginTop: "0",
                            marginBottom: "0",
                            padding: "0"
                          }}
                        >
                          סגור עכשיו
                        </p>
                        <FaCircle style={{ color: "red", fontSize: "12px" }} />
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
              </div>
            ) : (
              <div class="d-flex justify-content-center align-items-center">
                <FaCaretUp style={{ marginLeft: "5px", padding: "0" }} />
                {this.props.data.opening_hours ? (
                  <React.Fragment>
                    {this.props.data.opening_hours.open_now ? (
                      <div class="d-flex justify-content-center align-items-center">
                        <p
                          style={{
                            marginLeft: "5px",
                            marginTop: "0",
                            marginBottom: "0",
                            padding: "0"
                          }}
                        >
                          פתוח עכשיו
                        </p>
                        <FaCircle
                          style={{ color: "#50c878", fontSize: "12px" }}
                        />
                      </div>
                    ) : (
                      <div class="d-flex justify-content-center align-items-center">
                        <p
                          style={{
                            marginLeft: "5px",
                            marginTop: "0",
                            marginBottom: "0",
                            padding: "0"
                          }}
                        >
                          סגור עכשיו
                        </p>
                        <FaCircle style={{ color: "red", fontSize: "12px" }} />
                      </div>
                    )}
                  </React.Fragment>
                ) : null}
              </div>
            )}
            <p style={{ margin: "0", padding: "0" }}>{this.props.data.name}</p>
          </div>
        </div>
        {this.state.clicked ? (
          <PlaceComponentDetails data={this.props.data} />
        ) : null}
      </div>
    );
  }
}
