import React, { Component } from "react";
import Ingredients from "./components/Ingredients";
import SelectRecipe from "./components/SelectRecipe";
import SelectIngs from "./components/SelectIngs";
import SelectUnit from "./components/SelectUnit";
import MasterIngredients from "./components/MasterIngredients";
import RecipeForm from "./components/RecipeForm";
import MasterRecipesPane from "./components/MasterRecipesPane";
import _ from "lodash";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
    let prevState = _.cloneDeep(this.state);
    const masterRecs = _.cloneDeep(this.state.masterRecipes);
    let mastIndex = [];
    let newMaster = [];
    masterRecs.forEach(recs => {
      for (let i = 0; i < recs.ingredients.length; i++) {
        const index = mastIndex.indexOf(recs.ingredients[i][0]);
        if (index === -1) {
          mastIndex.push(recs.ingredients[i][0]);
          newMaster.push(recs.ingredients[i]);
        } else {
          newMaster[index][1] =
            parseFloat(newMaster[index][1]) +
            parseFloat(recs.ingredients[i][1]);
        }
      }
      return newMaster;
    });
    prevState.masterTotal = newMaster;
    this.setState(prevState);
  };
  handleToMaster = () => {
    let prevStates = this.state;
    const recipe = this.state.recipe;
    prevStates.masterRecipes.push(recipe);
    prevStates.recipe = { name: "", ingredients: [], servings: 1 };
    prevStates.newRecipe = false;
    this.setState({ prevStates });
    document.getElementById("selRec").value = null;
    this.sumIng();
  };
  handleDelete = ing => {
    let ingredients = this.state.recipe.ingredients;
    _.remove(ingredients, n => n[0] === ing);
    let ste = this.state;
    ste.recipe.ingredients = ingredients;
    this.setState(ste);
  };
  handleMasterPaneDelete = (recI, ing) => {
    let prevState = this.state;
    let ingredients = this.state.masterRecipes[recI].ingredients;
    prevState.masterRecipes[recI].ingredients = _.remove(
      ingredients,
      n => n[0] === ing
    );
    this.setState(prevState);
    this.sumIng();
  };
  handleMastDelete = name => {
    let prevState = this.state;
    prevState.masterRecipes.forEach(recs =>
      _.remove(recs.ingredients, n => n[0] === name)
    );
    this.setState(prevState);
    this.sumIng();
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
  postJSON = () => {
    let prevState = this.state;
    let name = this.state.recipe.name;
    const ing = this.state.recipe.ingredients.length;
    if (name === "") name = prompt("You must enter a recipe name!");
    if (!(ing > 0)) {
      alert("You must enter ingredients to add recipe to Recipebook");
    } else if (name !== null || name !== "") {
      document.getElementById("selRec").value = name;
      prevState.recipe.name = name;
      this.setState(prevState);
      console.log(name);
      fetch("http://localhost:5000/add/", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(this.state.recipe)
      })
        .then(response => response.json())
        .then(res => console.log(res)); // parses response to JSON
    }
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
                onClick={this.test}
                className="col-md-1 btn btn-outline-primary">
                T
              </button>
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
              onJSON={this.postJSON}
              onClear={this.handleClear}
              onToMaster={this.handleToMaster}
            />
          </div>
          <hr />
          <MasterIngredients
            onDelete={this.handleMastDelete}
            recipe={this.state.masterTotal}
          />
          <MasterRecipesPane
            onDelete={this.handleMasterPaneDelete}
            recipes={this.state.masterRecipes}
          />
        </div>
      );
    }
  }
}

export default App;
