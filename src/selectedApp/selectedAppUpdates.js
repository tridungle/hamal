import React, { Component } from "react";
import FadeIn from "react-fade-in";
import { FaPlus, FaTimes } from "react-icons/fa";
import moment from "moment/min/moment-with-locales";

export default class SelectedAppUpdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      title: undefined,
      body: undefined
    };
  }

  render() {
    return (
      <div class="mt-2" dir="rtl">
        <FadeIn>
          <div
            onClick={() => this.setState({ editMode: !this.state.editMode })}
            class="btn btn-light btn-block font-weight-bold hoverMe"
          >
            {!this.state.editMode ? "להוסיף עדכון" : "ביטול"}
            {!this.state.editMode ? (
              <FaPlus style={{ marginRight: "10px" }} />
            ) : (
              <FaTimes style={{ marginRight: "10px" }} />
            )}
          </div>
        </FadeIn>
        <hr style={{ borderTop: "1px solid white" }} />

        {this.state.editMode ? (
          <div class="mt-4">
            <FadeIn>
              <input
                style={{
                  padding: "5px",
                  backgroundColor: "#282c34",
                  color: "white",
                  border: "1px solid white"
                }}
                placeholder="כותרת"
                type="text"
                onChange={e => this.setState({ title: e.target.value })}
              />
              <textarea
                style={{
                  padding: "5px",
                  backgroundColor: "#282c34",
                  color: "white",
                  border: "1px solid white",
                  width: "50%",
                  minWidth: "180px"
                }}
                class="mt-3"
                rows="5"
                placeholder="עדכון"
                onChange={e => this.setState({ body: e.target.value })}
              />
            </FadeIn>
            {this.state.title && this.state.body ? (
              <div
                class="btn btn-outline-light mt-3 font-weight-bold"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.addPost(
                    this.props.selectedAppInfo.appName,
                    this.state.title,
                    this.state.body
                  );
                  this.setState({ editMode: false });
                }}
              >
                שלח עדכון
              </div>
            ) : null}
          </div>
        ) : null}
        {this.props.selectedAppInfo.posts && !this.state.editMode ? (
          <div class="mt-3">
            <FadeIn>
              {this.props.selectedAppInfo.posts
                .sort(function(a, b) {
                  a = new Date(a.date);
                  b = new Date(b.date);
                  return a > b ? -1 : a < b ? 1 : 0;
                })
                .map(post => (
                  <div
                    key={Math.random()}
                    style={{
                      textAlign: "right",
                      borderBottom: "1px solid white",
                      wordBreak: "break-all"
                    }}
                  >
                    <p style={{ float: "left", fontSize: "14px" }}>
                      {moment(post.date)
                        .locale("he")
                        .fromNow()}
                    </p>
                    <h5 class="mt-3">{post.title}</h5>
                    <p style={{ fontSize: "15px" }}>{post.body}</p>
                  </div>
                ))}
            </FadeIn>
          </div>
        ) : null}
      </div>
    );
  }
}
