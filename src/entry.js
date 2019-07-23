import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import Content from "./Content";
import Sidebar from "./Sidebar";
import "./App.css";
import Geocode from "react-geocode";
import ReactLoading from "react-loading";

Geocode.setApiKey("ENTER GOOGLE API KEY");

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      app: "home",
      apps: undefined,
      sidebar: false
    };
    this.newApp = this.newApp.bind(this);
    this.addPost = this.addPost.bind(this);
    this.hideSidebar = this.hideSidebar.bind(this);
    this.updateHebrew = this.updateHebrew.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
    this.changeApp = this.changeApp.bind(this);
  }
  addPost(name, title, body) {
    const client = Stitch.defaultAppClient;
    const mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      "template"
    );
    var db = mongodb.db("Infrastructure");
    var collection = db.collection("Apps");
    collection
      .findOneAndUpdate(
        { appName: name },
        {
          $push: {
            posts: {
              title: title,
              body: body,
              date: new Date()
            }
          }
        }
      )
      .then(() => {
        collection
          .find({}, { sort: { date: -1 } })
          .asArray()
          .then(results => {
            this.setState({
              apps: results,
              app: name
            });
          });
      });
  }
  hideSidebar() {
    this.setState({ sidebar: !this.state.sidebar });
  }
  componentWillMount() {
    Stitch.initializeDefaultAppClient("ENTER STITCH APP ID");
    const client = Stitch.defaultAppClient;
    client.auth.loginWithCredential(new AnonymousCredential()).then(user => {
      const mongodb = client.getServiceClient(
        RemoteMongoClient.factory,
        "template"
      );
      var db = mongodb.db("Infrastructure");
      var collection = db.collection("Apps");
      collection
        .find({}, { sort: { date: -1 } })
        .asArray()
        .then(results => {
          this.setState({
            apps: results
          });
        });
    });
  }
  newApp(name) {
    const client = Stitch.defaultAppClient;
    const mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      "template"
    );
    var db = mongodb.db("Infrastructure");
    var collection = db.collection("Apps");
    Geocode.fromAddress(name).then(
      response => {
        console.log(response.results[0]);
        var arrAddress = response.results[0].address_components;
        var itemLocality = "";
        var itemCountry = "";

        for (var i = 0; i < arrAddress.length; i++) {
          if (arrAddress[i].types[0] === "locality") {
            itemLocality = arrAddress[i].long_name;
          }
          if (arrAddress[i].types[0] === "country") {
            itemCountry = arrAddress[i].long_name;
          }
        }
        if (itemLocality === "") {
          itemLocality = name;
        }
        console.log("City: " + itemLocality);
        const { lat, lng } = response.results[0].geometry.location;
        collection
          .insertOne({
            appName: name,
            city: itemLocality,
            country: itemCountry,
            latitude: lat,
            longitude: lng,
            bounds: response.results[0].geometry.viewport,
            date: new Date()
          })
          .then(() => {
            collection
              .find({}, { sort: { date: -1 } })
              .asArray()
              .then(results => {
                this.setState({
                  apps: results,
                  app: name
                });
              });
          });
      },
      error => {
        console.error(error);
      }
    );
  }
  deleteApp(name) {
    const client = Stitch.defaultAppClient;
    const mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      "template"
    );
    var db = mongodb.db("Infrastructure");
    var collection = db.collection("Apps");
    collection.findOneAndDelete({ appName: name }).then(() => {
      collection
        .find({}, { sort: { date: -1 } })
        .asArray()
        .then(results => {
          this.setState({
            app: "home",
            apps: results
          });
        });
    });
  }
  updateHebrew(name, myparam, newValue) {
    const client = Stitch.defaultAppClient;
    const mongodb = client.getServiceClient(
      RemoteMongoClient.factory,
      "template"
    );
    var db = mongodb.db("Infrastructure");
    var collection = db.collection("Apps");
    collection
      .findOneAndUpdate(
        { appName: name },
        { $set: { hebrew: newValue } },
        { upsert: "true" }
      )
      .then(() => {
        collection
          .find({}, { sort: { date: -1 } })
          .asArray()
          .then(results => {
            console.log("updated");
            this.setState({
              app: name,
              apps: results
            });
          });
      });
  }
  changeApp(app) {
    this.setState({ app: app });
  }
  render() {
    return (
      <div>
        {this.state.apps ? (
          <div class="wrapper" dir="rtl">
            {this.state.sidebar ? (
              <Sidebar
                deleteApp={this.deleteApp}
                newApp={this.newApp}
                apps={this.state.apps}
                app={this.state.app}
                changeApp={this.changeApp}
              />
            ) : null}
            <Content
              hideSidebar={this.hideSidebar}
              deleteApp={this.deleteApp}
              newApp={this.newApp}
              app={this.state.app}
              apps={this.state.apps}
              updateHebrew={this.updateHebrew}
              addPost={this.addPost}
              changeApp={this.changeApp}
            />
          </div>
        ) : (
          <div class="App-header">
            <ReactLoading type={"bars"} color={"white"} />
          </div>
        )}
      </div>
    );
  }
}
