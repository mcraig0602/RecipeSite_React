import React, { Component } from "react";
import MasterRecipePane from "./MasterRecipePane";
//import MasterRecipePane from "./components";

class MasterRecipesPane extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="nav nav-tabs" id="myTab" visibility="hidden">
          {this.props.recipes.map((recipe, i) => (
            <a
              className="nav-link"
              key={i + 1}
              id="{recipe.name}-tab"
              data-toggle="tab"
              href="#{recipe.name}"
              role="tab">
              {recipe.name}
            </a>
          ))}
        </ul>
        <div className="tab-content" id="tab-content">
          <MasterRecipePane recipe={this.props.recipes} />
        </div>
      </React.Fragment>
    );
  }
}

export default MasterRecipesPane;
