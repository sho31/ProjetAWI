import React from 'react';
import MercurialPage from "./components/MercurialPage";
import SiderMenu from "./components/SiderMenu";
import "antd/dist/antd.css";
import "./App.less";
import Authors from "./components/Authors";
import AddTutorial from "./components/Ingredient/AddIngrédient";
import IngredientList from "./components/Ingredient/IngredientList";
import DataSheet from "./components/DataSheet/HeaderDataSheet";
import {Menu} from "antd";
import Realization from "./components/DataSheet/Realization";

const App = () => {
  return (
      <SiderMenu>
          <DataSheet id={1}></DataSheet>
          <Realization id={1}></Realization>
      </SiderMenu>
  );
};
export default App;