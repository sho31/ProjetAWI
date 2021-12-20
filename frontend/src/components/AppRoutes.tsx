import React, {Fragment} from 'react';
import "antd/dist/antd.css";
import "../App.less";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import DataSheet from "./DataSheet/HeaderDataSheet";
import MercurialPage from "./Mercurial/MercurialPage";
import SiderMenu from "./SiderMenu";

const AppRoutes = () => {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SiderMenu />} />
                    <Route path="/mercurial" element={<SiderMenu><MercurialPage /></SiderMenu>}/>
                    <Route path="/creerdT" element={<SiderMenu />} />
                    <Route path="/stock" element={<SiderMenu><DataSheet id={1}/></SiderMenu>}/>
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};
export default AppRoutes;