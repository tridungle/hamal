import React, { Component } from "react";
import {
  FaMapPin,
  FaGlobeAmericas,
  FaPhone,
  FaCaretDown,
  FaCaretUp
} from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import FadeIn from "react-fade-in";
import Carousel from "react-images";
import Lottie from "react-lottie";
import * as animationData from "../jsons/pics.json";
import ReactStars from "react-stars";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

export default class PlaceComponentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoURLS: [],
      review: false
    };
  }
  componentDidMount() {
    if (this.props.data.photos) {
      for (var i = 0; i < this.props.data.photos.length; i++) {
        fetch(
          `https://agamapi.azurewebsites.net/photos/${
            this.props.data.photos[i].photo_reference
          }`
        )
          .then(response => response.text())
          .then(photoURL => {
            var joined = this.state.photoURLS.concat({ source: photoURL });

            this.setState({ photoURLS: joined });
          });
      }
    }
  }
  render() {
    return (
      <div
        style={{
          borderLeft: "1px solid white",
          borderRight: "1px solid white",
          borderBottom: "1px solid white"
        }}
      >
        <FadeIn>
          <div class="p-3" style={{ overflow: "hidden" }}>
            {this.props.data.photos ? (
              this.state.photoURLS.length === this.props.data.photos.length ? (
                <FadeIn>
                  <div dir="ltr">
                    <Carousel
                      styles={{
                        view: () => ({
                          height: 200
                        })
                      }}
                      views={this.state.photoURLS}
                    />
                  </div>
                </FadeIn>
              ) : (
                <div style={{ height: "234px" }}>
                  <Lottie options={defaultOptions} width={200} height={200} />
                </div>
              )
            ) : null}
            <div class="d-flex flex-column justify-content-right align-items-end">
              <a
                href={this.props.data.url}
                rel="noopener noreferrer"
                target="_blank"
                data-tip="פתח מפה"
              >
                <div class="d-flex justify-content-center align-items-center">
                  {this.props.data.formatted_address
                    ? this.props.data.formatted_address
                    : "?"}
                  <FaMapPin style={{ marginRight: "10px" }} />
                </div>
              </a>
              {this.props.data.website ? (
                <a
                  class="mt-3"
                  href={this.props.data.website}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <div class="d-flex justify-content-center align-items-center">
                    <span dir="ltr" style={{ textDecoration: "underline" }}>
                      {this.props.data.website}
                    </span>
                    <FaGlobeAmericas style={{ marginRight: "10px" }} />
                  </div>
                </a>
              ) : null}
              {this.props.data.international_phone_number ? (
                <div class="d-flex justify-content-center align-items-center mt-3">
                  <span dir="ltr">
                    {this.props.data.international_phone_number}
                  </span>
                  <FaPhone style={{ marginRight: "10px" }} />
                </div>
              ) : null}
              <ReactTooltip effect="solid" />
            </div>
            {this.props.data.opening_hours ? (
              this.props.data.opening_hours.weekday_text ? (
                <div class="mt-3">
                  {this.props.data.opening_hours.weekday_text.map(day => (
                    <h6 key={Math.random()}>{day}</h6>
                  ))}
                </div>
              ) : null
            ) : null}
            {this.props.data.reviews ? (
              <div>
                <div
                  onClick={() => this.setState({ review: !this.state.review })}
                  style={{ cursor: "pointer" }}
                  class="btn btn-outline-light btn-block font-weight-bold mt-3 mb-3"
                >
                  ביקורות ({this.props.data.reviews.length})
                  {!this.state.review ? (
                    <FaCaretDown style={{ marginRight: "5px" }} />
                  ) : (
                    <FaCaretUp style={{ marginRight: "5px" }} />
                  )}
                </div>
                {this.state.review
                  ? this.props.data.reviews.map(review => (
                      <FadeIn key={Math.random()}>
                        <React.Fragment>
                          {review.language !== "iw" ? (
                            <div dir="ltr">
                              <div class="d-flex justify-content-right align-items-center mb-3">
                                <img
                                  src={review.profile_photo_url}
                                  alt="profilePic"
                                  style={{ height: "30px" }}
                                />
                                <h6 style={{ marginLeft: "5px" }}>
                                  {review.author_name}
                                </h6>
                              </div>
                              <div class="d-flex justify-content-right">
                                <ReactStars
                                  count={review.rating}
                                  size={24}
                                  color1={"#ffffff"}
                                  color2={"#ffffff"}
                                  style={{ textAlign: "right" }}
                                  edit={false}
                                />
                              </div>
                              <h6 class="mt-4" style={{ textAlign: "left" }}>
                                {review.text !== "" ? review.text : "--"}
                              </h6>
                            </div>
                          ) : (
                            <div>
                              <div class="d-flex justify-content-right align-items-center mb-3">
                                <img
                                  src={review.profile_photo_url}
                                  alt="profilePic"
                                  style={{ height: "30px" }}
                                />
                                <h6 style={{ marginRight: "5px" }}>
                                  {review.author_name}
                                </h6>
                              </div>
                              <div class="d-flex justify-content-right">
                                <ReactStars
                                  style={{ textAlign: "right" }}
                                  count={review.rating}
                                  size={24}
                                  color1={"#ffffff"}
                                  color2={"#ffffff"}
                                  edit={false}
                                />
                              </div>
                              <h6 class="mt-4" style={{ textAlign: "right" }}>
                                {review.text !== "" ? review.text : "?"}
                              </h6>
                            </div>
                          )}
                          <hr style={{ borderTop: "1px solid white" }} />
                        </React.Fragment>
                      </FadeIn>
                    ))
                  : null}
              </div>
            ) : null}
          </div>
        </FadeIn>
      </div>
    );
  }
}
