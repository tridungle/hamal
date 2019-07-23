import React, { Component } from "react";
import FadeIn from "react-fade-in";
import { FaTrashAlt } from "react-icons/fa";

export default class SelectedAppDelete extends Component {
  render() {
    return (
      <div class="mt-4">
        <FadeIn>
          <h2>למחוק את החמ"ל הזה?</h2>
          <div
            style={{ cursor: "pointer" }}
            class="btn btn-outline-danger font-weight-bold mt-4 pr-5 pl-5"
            onClick={() =>
              this.props.deleteApp(this.props.selectedAppInfo.appName)
            }
          >
            <FaTrashAlt />
          </div>
        </FadeIn>
      </div>
    );
  }
}
