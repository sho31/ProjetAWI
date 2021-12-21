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
import HomePage from "./HomePage/HomePage";

const AppRoutes = () => {

    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SiderMenu><HomePage/></SiderMenu>} />
                    <Route path="/mercurial" element={<SiderMenu><MercurialPage /></SiderMenu>}/>
                    <Route path="/creerdT" element={<SiderMenu />} />
                    <Route path="/stock" element={<SiderMenu></SiderMenu>}/>
                    <Route path="/fichetechnique/:id" element={<SiderMenu><DataSheet/></SiderMenu>}/>
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};
export default AppRoutes;