import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class SelectRecipe extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.recs.map(rec => (
          <option key={rec} value={rec}>
            {rec}
          </option>
        ))}
      </React.Fragment>
    );
  }
}

export default SelectRecipe;
