import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class SelectUnit extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.units.map(unit => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </React.Fragment>
    );
  }
}

export default SelectUnit;
