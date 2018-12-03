import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class MasterIngredient extends Component {
  render() {
    console.log(this.props);
    return (
      <tr>
        <th>{this.props.index}</th>
        <td>{this.props.ingredient[0]}</td>
        <td>
          {this.props.ingredient[1]} {this.props.ingredient[2]}
        </td>
        <td>
          <button
            onClick={() => this.props.onDelete(this.props.index)}
            className="btn btn-outline-danger">
            -
          </button>
        </td>
      </tr>
    );
  }
}

export default MasterIngredient;
