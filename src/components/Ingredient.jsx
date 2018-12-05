import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class Ingredient extends Component {
  render() {
    return (
      <tr>
        <th>{this.props.index}</th>
        <td>{this.props.ingredient[0]}</td>
        <td>
          {parseInt(this.props.ingredient[1]) * this.props.servings}{" "}
          {this.props.ingredient[2]}
        </td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.ingredient[0])}
            className="btn btn-outline-danger">
            -
          </button>
        </td>
      </tr>
    );
  }
}
export default Ingredient;
