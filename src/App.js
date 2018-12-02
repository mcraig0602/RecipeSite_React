import React, { Component } from "react";
import Ingredients from "./components/Ingredients";
import SelectRecipe from "./components/SelectRecipe";
import SelectIngs from "./components/SelectIngs";
import SelectUnit from "./components/SelectUnit";
import MasterIngredients from "./components/MasterIngredients";
import RecipeForm from "./components/RecipeForm";
import "./App.css";

class App extends Component {
  state = {
    recipe: {
      name: "",
      ingredients: []
    },
    masterRecipes: [],
    isLoaded: false
  };

  componentDidMount() {
    let uniqueIngredients = [];
    let uniqueRecipes = [];
    let uniqueUnits = [];
    fetch("http://localhost:5000/all/units")
      .then(res => res.json())
      .then(res => (uniqueUnits = res.units));
    fetch("http://localhost:5000/all/recipes")
      .then(res => res.json())
      .then(res => (uniqueRecipes = res.recipe));
    fetch("http://localhost:5000/all/ingredients")
      .then(res => res.json())
      .then(ings => (uniqueIngredients = ings.ingredients))
      .then(() => {
        this.setState({
          recs: uniqueRecipes,
          ings: uniqueIngredients,
          units: uniqueUnits,
          isLoaded: true
        });
      });
  }
  sumIng = () => {};
  handleToMaster = () => {
    let prevState = this.state;
    const recipe = this.state.recipe;
    if (this.state.masterRecipes.length === 0) {
      prevState.masterRecipes.push(recipe);
      prevState.recipe = { name: "", ingredients: [] };
      this.setState(prevState);
    }
  };
  handleDelete = index => {
    const ingredients = this.state.recipe.ingredients
      .slice(0, index - 1)
      .concat(
        this.state.recipe.ingredients.slice(
          index,
          this.state.recipe.ingredients.length
        )
      );
    let ste = this.state;
    ste.recipe.ingredients = ingredients;
    this.setState(ste);
  };
  handleRecipeLoader = () => {
    const recipe = document.getElementById("selRec").value;
    let prevState = this.state;
    fetch(`http://localhost:5000/search/${recipe}`)
      .then(data => data.json())
      .then(json => {
        prevState.recipe.name = json.recipe;
        prevState.recipe.ingredients = json.ingredients;
        this.setState(prevState);
      })
      .catch(() => {
        prevState.recipe.name = "";
        prevState.recipe.ingredients = [];
        this.setState(prevState);
      });
  };
  render() {
    if (!this.state.isLoaded) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div className="container">
          <h1>Recipe Builder</h1>
          <h2 id="recTitle">{this.state.recipe.name}</h2>
          <div className="row">
            <input
              list="recipes"
              className="input-group col"
              id="selRec"
              onChange={this.handleRecipeLoader}
              placeholder="Select a Recipe"
            />
            <datalist id="recipes">
              <SelectRecipe recs={this.state.recs} />
            </datalist>
            <input
              type="number"
              className="input-group col"
              id="sevInput"
              name="sevInput"
              placeholder="Servings"
              min="1"
              step="1"
            />
          </div>
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
              <Ingredients
                onDelete={this.handleDelete}
                recipe={this.state.recipe}
              />
            </tbody>
          </table>
          <div className="row form-control-group">
            <div className="form-group">
              <button className="offset-md-1 col-md-1 btn btn-outline-primary">
                +
              </button>
              <input
                list="ings"
                className="col-md-5"
                placeholder="Select an ingredient"
              />
              <datalist id="ings">
                <SelectIngs ingredients={this.state.ings} />
              </datalist>
              <input
                type="number"
                id="qtyInput"
                className="col-md-2 col-sm-2 col-lg-2"
                name="qtyInput"
                placeholder="Qty"
                min="0"
                step="0.25"
              />
              <select
                name="units"
                className="col-md-2"
                defaultValue="placeholder">
                <option value="placeholder" disabled>
                  Units
                </option>
                <SelectUnit units={this.state.units} />
              </select>
            </div>
            <RecipeForm onToMaster={this.handleToMaster} />
          </div>
          <hr />
          <MasterIngredients
            onDelete={this.handleDelete}
            recipe={this.state.masterRecipes}
          />
        </div>
      );
    }
  }
}

export default App;
