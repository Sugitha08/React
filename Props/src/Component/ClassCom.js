import React, { Component } from "react";

export default class ClassCom extends Component {
  constructor() {
    super();
    this.state = { color: "red", fontSize: 30 };
  }

  render() {
    const { color, fontSize } = this.state;
    return (
      <div className="container card w-50 my-2 bg-light">
        <h2 className="text-center mt-1" style={{ color: "blue" }}>
          Class Component
        </h2>
        <h1
          className="text-center mt-1"
          style={{ color: `${color}`, fontSize: `${fontSize}px` }}
        >
          {this.props.fname}
        </h1>
        <button
          type="button"
          className="btn btn-secondary d-block mx-auto mb-2"
          onClick={() =>
            this.setState({
              color: "purple",
              fontSize: this.state.fontSize + 20,
            })
          }
        >
          change
        </button>
      </div>
    );
  }
}
