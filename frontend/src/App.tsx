import React, {Fragment} from 'react';
import "antd/dist/antd.css";
import "./App.less";
import AppRoutes from "./components/AppRoutes";
import Cost from "./components/DataSheet/Cost" //TODO ENLEVER
//<AppRoutes></AppRoutes>
//<Cost DatasheetId={28} nbCouverts={8}></Cost>
const App = () => {
  return (
      <Fragment>
          <AppRoutes></AppRoutes>
      </Fragment>
  );
};
export default App;