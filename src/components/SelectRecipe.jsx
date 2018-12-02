import React, { Component } from "react";

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
