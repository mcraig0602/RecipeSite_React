import React, { Component } from "react";

class SelectIngs extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.ingredients.map(ing => (
          <option key={ing} value={ing}>
            {ing}
          </option>
        ))}
      </React.Fragment>
    );
  }
}

export default SelectIngs;
