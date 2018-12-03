import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class MasterRecipePane extends Component {
  render() {
    return (
      <div
        className="tab-pane fade indRecipe"
        id={this.props.recipe.name.replace(/ /g, "_")}
        role="tabpanel">
        <table
          id={"Tbl" + this.props.recipe.name.replace(/ /g, "_")}
          className="table-sm table-hover">
          <thead>
            <tr id="topper">
              <th width="5%" />
              <th width="50%">Ingredient</th>
              <th width="7%">Quantity</th>
              <th width="10%" />
            </tr>
          </thead>
          <tbody id="mstrTbl">
            {this.props.recipe.ingredients.map((ing, i) => (
              <tr key={i + 1} id="indIngredients">
                <th key={i + 1}>{i + 1}</th>
                <td>{ing[0]}</td>
                <td id="qty">{ing[1] + " " + ing[2]}</td>
                <td>
                  <button
                    onClick={() =>
                      this.props.onDelete(this.props.masterIndex, i)
                    }
                    type="button"
                    id="removeBtn"
                    className="btn btn-outline-danger">
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MasterRecipePane;
