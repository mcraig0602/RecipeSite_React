import React, { Component } from "react";
import MasterIngredient from "./MasterIngredient";

class MasterIngredients extends Component {
  render() {
    if (this.props.recipe.length !== 0) {
      return (
        <React.Fragment>
          <h2>Grocery List</h2>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" width="5%">
                  #
                </th>
                <th scope="col" width="30%">
                  Ingredient
                </th>
                <th scope="col" width="7%">
                  Quantity
                </th>
                <th scope="col" width="10%" />
              </tr>
            </thead>
            <tbody>
              {this.props.recipe[0].ingredients.map((ing, i) => (
                <MasterIngredient
                  onDelete={this.props.onDelete}
                  key={i + 1}
                  ingredient={ing}
                  index={i + 1}
                />
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    } else {
      return (
        <div className="card">
          <h3 className="card-body">Add recipe</h3>
        </div>
      );
    }
  }
}

export default MasterIngredients;
