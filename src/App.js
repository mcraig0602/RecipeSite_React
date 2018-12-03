import React, { Component } from "react";
import Ingredients from "./components/Ingredients";
import SelectRecipe from "./components/SelectRecipe";
import SelectIngs from "./components/SelectIngs";
import SelectUnit from "./components/SelectUnit";
import MasterIngredients from "./components/MasterIngredients";
import RecipeForm from "./components/RecipeForm";
import MasterRecipesPane from "./components/MasterRecipesPane";
import "./App.css";

class App extends Component {
  state = {
    recipe: {
      name: "",
      ingredients: [],
      servings: 1
    },
    masterRecipes: [],
    masterTotal: [],
    isLoaded: false,
    newRecipe: false
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
  addIng = () => {
    if (
      document.getElementById("ingInput").value !== "" &&
      document.getElementById("qtyInput").value !== "" &&
      document.getElementById("ingInput").value !== "placeholder"
    ) {
      let prevState = this.state;
      prevState.recipe.ingredients.push([
        document.getElementById("ingInput").value,
        document.getElementById("qtyInput").value,
        document.getElementById("unitInput").value
      ]);
      prevState.newRecipe = true;
      this.setState(prevState);
      document.getElementById("ingInput").value = null;
      document.getElementById("qtyInput").value = null;
      document.getElementById("unitInput").value = "placeholder";
    } else alert("You must fill out all fields!");
  };
  sumIng = () => {
    let prevState = this.state;
    const masterRecs = this.state.masterRecipes;
    let newMasterI = [];
    let newMaster = [];
    masterRecs.forEach(recs => {
      recs.ingredients.forEach(ings => {
        let index = newMasterI.indexOf(ings[0]);
        if (index === -1) {
          newMasterI.push(ings[0]);
          newMaster.push(ings);
        } else {
          newMaster[index][1] =
            parseFloat(newMaster[index][1]) + parseFloat(ings[1]);
        }
      });
    });
    prevState.masterTotal = newMaster;
    this.setState(prevState);
  };
  handleToMaster = () => {
    let prevState = this.state;
    const recipe = this.state.recipe;
    prevState.masterRecipes.push(recipe);
    prevState.recipe = { name: "", ingredients: [], servings: 1 };
    prevState.newRecipe = false;
    this.setState(prevState);
    document.getElementById("selRec").value = null;
    this.sumIng();
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
    if (!this.state.newRecipe) {
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
          prevState.recipe.servings = 1;
          this.setState(prevState);
        });
    } else {
      prevState.recipe.name = recipe;
      this.setState(prevState);
    }
  };
  handleServings = () => {
    let prevState = this.state;
    document.getElementById("sevInput").value === ""
      ? (prevState.recipe.servings = 1)
      : (prevState.recipe.servings = document.getElementById("sevInput").value);
    this.setState(prevState);
  };
  handleClear = () => {
    let prevState = this.state;
    prevState.recipe = { name: "", ingredients: [], servings: 1 };
    prevState.newRecipe = false;
    document.getElementById("selRec").value = null;
    this.setState(prevState);
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
              onChange={this.handleServings}
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
              <button
                onClick={this.addIng}
                className="offset-md-1 col-md-1 btn btn-outline-primary">
                +
              </button>
              <input
                list="ings"
                id="ingInput"
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
                id="unitInput"
                className="col-md-2"
                defaultValue="placeholder">
                <option value="placeholder" disabled>
                  Units
                </option>
                <SelectUnit units={this.state.units} />
              </select>
            </div>
            <RecipeForm
              onClear={this.handleClear}
              onToMaster={this.handleToMaster}
            />
          </div>
          <hr />
          <MasterIngredients
            onDelete={this.handleDelete}
            recipe={this.state.masterTotal}
          />
          <MasterRecipesPane recipes={this.state.masterRecipes} />
        </div>
      );
    }
  }
}

export default App;
