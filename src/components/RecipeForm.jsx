import React, { Component } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

class RecipeForm extends Component {
  render() {
    return (
      <div className="row form-group">
        <button
          onClick={() => this.props.onToMaster()}
          className="btn btn-outline-primary col-md-3 offset-md-3">
          Add to Master
        </button>
        <button
          onClick={() => this.props.onClear()}
          className="btn btn-outline-danger col-md-2">
          Clear List
        </button>
        <button
          className="btn btn-outline-primary col-md-3"
          onClick={() => this.props.onJSON()}>
          Recipebook
        </button>
      </div>
    );
  }
}

export default RecipeForm;
