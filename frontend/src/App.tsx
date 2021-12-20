import React, {Fragment} from 'react';
import "antd/dist/antd.css";
import "./App.less";

import AppRoutes from "./components/AppRoutes";

const App = () => {
  return (
      <Fragment>
          <AppRoutes></AppRoutes>
      </Fragment>
  );
};
export default App;