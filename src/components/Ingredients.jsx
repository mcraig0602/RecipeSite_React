import React, { Component } from "react";
import Ingredient from "./Ingredient";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class Ingredients extends Component {
  render() {
    if (this.props.recipe.ingredients.length === 0) {
      return (
        <tr>
          <th colSpan={4} id="blankholder" scope="row">
            Select a Recipe
          </th>
        </tr>
      );
    } else {
      return (
        <React.Fragment>
          {this.props.recipe.ingredients.map((ing, i) => (
            <Ingredient
              onDelete={this.props.onDelete}
              key={i + 1}
              servings={this.props.recipe.servings}
              ingredient={ing}
              index={i + 1}
            />
          ))}
        </React.Fragment>
      );
    }
  }
}
export default Ingredients;
