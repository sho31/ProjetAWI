import React from 'react';
import MercurialPage from "./components/MercurialPage";
import SiderMenu from "./components/SiderMenu";
import "antd/dist/antd.css";
import "./App.less";
const App = () => {
  return (
      <SiderMenu>
        <MercurialPage></MercurialPage>
      </SiderMenu>

  );
};
export default App;