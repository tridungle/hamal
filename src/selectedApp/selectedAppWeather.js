import React, { Component } from "react";
import FadeIn from "react-fade-in";
import Chart from "react-apexcharts";
import moment from "moment/min/moment-with-locales";

export default class SelectedAppWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: undefined,
      forecast: undefined
    };
    this.getForecast = this.getForecast.bind(this);
  }
  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        this.props.selectedAppInfo.latitude
      }&lon=${
        this.props.selectedAppInfo.longitude
      }&APPID=${"ENTER OPENWEATHERMAP API"}&units=metric`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ weather: json });
      });
  }
  getForecast() {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        this.props.selectedAppInfo.latitude
      }&lon=${
        this.props.selectedAppInfo.longitude
      }&APPID=${"ENTER OPENWEATHERMAP API"}&units=metric`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          forecast: json
        });
      });
  }
  render() {
    if (this.state.forecast) {
      var graphTimestamps = this.state.forecast.list.map(item => {
        return moment(item.dt_txt).format("DD/MM HH:mm");
      });
      var graphTemps = this.state.forecast.list.map(item => {
        return item.main.temp;
      });
      var options = {
        chart: {
          foreColor: "#ffffff",
          selection: {
            enabled: true,
            type: "x"
          },
          animations: {
            enabled: false
          }
        },
        legend: {
          show: false
        },
        tooltip: {
          enabled: true,
          theme: "pallete1"
        },
        grid: {
          show: false
        },
        colors: ["#ffffff"],
        fill: {
          colors: ["#ffffff"]
        },
        xaxis: {
          categories: graphTimestamps,
          labels: {
            show: false
          }
        },
        subtitle: {
          text: `תחזית השבוע`,
          align: "center",
          floating: true,
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#ffffff"
          }
        }
      };
      var series = [
        {
          name: "&deg;C",
          data: graphTemps
        }
      ];
    }
    return (
      <div>
        {this.state.weather && !this.state.weather.message ? (
          <div>
            <FadeIn>
              <div class="m-2 text-center">
                <h3>טמפרטורה: {this.state.weather.main.temp}&deg;</h3>
                <h6>מקסימום להיום: {this.state.weather.main.temp_max}&deg;</h6>
                <h6>מינימום להיום: {this.state.weather.main.temp_min}&deg;</h6>
                <br />
                <h6>כיוון הרוח: {this.state.weather.wind.deg}&deg;</h6>
                <h6>מהירות הרוח: {this.state.weather.wind.speed}km/h</h6>
                <br />
                <h6>לחות: {this.state.weather.main.humidity}%</h6>
              </div>
              <hr style={{ borderTop: "1px solid white", padding: "0" }} />
              {this.state.forecast ? (
                <FadeIn>
                  <div class="m-2" dir="ltr">
                    <Chart
                      options={options}
                      series={series}
                      type="line"
                      width="100%"
                      style={{
                        maxWidth: "300 !important"
                      }}
                    />
                  </div>
                </FadeIn>
              ) : (
                <div
                  class="btn btn-outline-light font-weight-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => this.getForecast()}
                >
                  תחזית של {this.props.selectedAppInfo.city}
                </div>
              )}
            </FadeIn>
          </div>
        ) : null}
        {this.state.weather && this.state.weather.message ? (
          <div>
            <h3 class="mt-5">אין חיבור ל Weather API</h3>
            <h3 class="mt-5">שגיאה:</h3>
            <h3 class="mt-5">{this.state.weather.message}</h3>
          </div>
        ) : null}
      </div>
    );
  }
}
