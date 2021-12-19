import React from 'react';
import SiderMenu from "./components/SiderMenu";
import "antd/dist/antd.css";
import "./App.less";

import DataSheet from "./components/DataSheet/HeaderDataSheet";
import PrintPage from "./components/DataSheet/PrintPage";

const App = () => {
  return (
      <SiderMenu>
          <PrintPage></PrintPage>
      </SiderMenu>
  );
};
export default App;