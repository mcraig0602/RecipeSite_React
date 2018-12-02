import React, { Component } from "react";

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
