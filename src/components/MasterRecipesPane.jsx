import React, { Component } from "react";
import MasterRecipePane from "./MasterRecipePane";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import $ from "jquery";
//import MasterRecipePane from "./components";

class MasterRecipesPane extends Component {
  render() {
    if (this.props.recipes.length === 0)
      $("#myTab").attr("visibility", "visible");
    return (
      <React.Fragment>
        <ul className="nav nav-tabs" id="myTab" visibility="hidden">
          {this.props.recipes.map((recipe, i) => (
            <li key={i + 1} className="nav-item">
              <a
                className="nav-link"
                key={i + 1}
                id={recipe.name.replace(/ /g, "_") + "-tab"}
                data-toggle="tab"
                href={"#" + recipe.name.replace(/ /g, "_")}
                role="tab">
                {recipe.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content" id="tab-content">
          {this.props.recipes.map((recipe, i) => (
            <MasterRecipePane
              key={i + 1}
              recipe={recipe}
              masterIndex={i}
              onDelete={this.props.onDelete}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default MasterRecipesPane;
