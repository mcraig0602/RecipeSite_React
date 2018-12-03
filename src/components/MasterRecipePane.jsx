import React, { Component } from "react";

class MasterRecipePane extends Component {
  render() {
    return (
      <div
        className="tab-pane fade indRecipe active show"
        id="MushroomRisotto"
        role="tabpanel">
        <table id="TblMushroomRisotto" className="table-sm table-hover">
          <thead>
            <tr id="topper">
              <th width="5%" />
              <th width="50%">Ingredient</th>
              <th width="7%">Quantity</th>
              <th width="10%" />
            </tr>
          </thead>

          <tbody id="mstrTbl">
            <tr id="indIngredients">
              <th>1</th>
              <td>Rice, Arborio</td>
              <td id="qty">2 cup(dry)</td>
              <td>
                <button
                  type="button"
                  id="removeBtn"
                  onclick="rmvRow3(this)"
                  className="btn btn-outline-danger">
                  -
                </button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Mushrooms,Dried</td>
              <td id="qty">1 oz</td>
              <td>
                <button
                  type="button"
                  id="removeBtn"
                  onclick="rmvRow3(this)"
                  className="btn btn-outline-danger">
                  -
                </button>
              </td>
            </tr>
            <tr>
              <th>3</th>
              <td>Stock, Chicken</td>
              <td id="qty">3 cup(wet)</td>
              <td>
                <button
                  type="button"
                  id="removeBtn"
                  onclick="rmvRow3(this)"
                  className="btn btn-outline-danger">
                  -
                </button>
              </td>
            </tr>
            <tr>
              <th>4</th>
              <td>Shallots</td>
              <td id="qty">2 oz</td>
              <td>
                <button
                  type="button"
                  id="removeBtn"
                  onclick="rmvRow3(this)"
                  className="btn btn-outline-danger">
                  -
                </button>
              </td>
            </tr>
            <tr>
              <th>5</th>
              <td>Reisling</td>
              <td id="qty">2 floz</td>
              <td>
                <button
                  type="button"
                  id="removeBtn"
                  onclick="rmvRow3(this)"
                  className="btn btn-outline-danger">
                  -
                </button>
              </td>
            </tr>
            <tr>
              <th>6</th>
              <td>Thyme</td>
              <td id="qty">1 tbsp</td>
              <td>
                <button
                  type="button"
                  id="removeBtn"
                  onclick="rmvRow3(this)"
                  className="btn btn-outline-danger">
                  -
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default MasterRecipePane;
