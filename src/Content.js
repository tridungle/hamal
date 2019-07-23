import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NewAppForm from "./newAppForm";
import HomeApp from "./homeApp";
import SelectedApp from "./selectedApp";
import { FaAlignJustify } from "react-icons/fa";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newAppInput: undefined,
      selectedAppInfo: undefined
    };
    this.newApp = this.newApp.bind(this);
    this.addPost = this.addPost.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
    this.updateHebrew = this.updateHebrew.bind(this);
    this.changeApp = this.changeApp.bind(this);
  }
  newApp(app) {
    this.props.newApp(app);
  }
  addPost(name, title, body) {
    this.props.addPost(name, title, body);
  }
  deleteApp(app) {
    this.props.deleteApp(app);
  }
  updateHebrew(name, param, newValue) {
    this.props.updateHebrew(name, param, newValue);
  }
  changeApp(app) {
    this.props.changeApp(app);
  }
  render() {
    return (
      <nav class="content" id="content">
        <FaAlignJustify
          onClick={this.props.hideSidebar}
          style={{ float: "right", margin: "10px", cursor: "pointer" }}
        />
        <div class="container text-center justify-content-center">
          {this.props.app === "add" ? (
            <NewAppForm changeApp={this.changeApp} newApp={this.newApp} />
          ) : (
            <div>
              {this.props.app === "home" ? (
                <HomeApp changeApp={this.changeApp} apps={this.props.apps} />
              ) : (
                <SelectedApp
                  changeApp={this.changeApp}
                  apps={this.props.apps}
                  app={this.props.app}
                  deleteApp={this.deleteApp}
                  updateHebrew={this.updateHebrew}
                  addPost={this.addPost}
                />
              )}
            </div>
          )}
        </div>
      </nav>
    );
  }
}
