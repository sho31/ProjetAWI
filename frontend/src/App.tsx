import React from 'react';
import SiderMenu from "./components/SiderMenu";
import "antd/dist/antd.css";
import "./App.less";

import DataSheet from "./components/DataSheet/HeaderDataSheet";

const App = () => {
  return (
      <SiderMenu>
          <DataSheet id={1}></DataSheet>
      </SiderMenu>
  );
};
export default App;