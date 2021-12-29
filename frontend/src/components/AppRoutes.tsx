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
import DataSheetCreation from "./DataSheetCreation/DataSheetCreation";
import CatAllergenList from "./AllergenList/CatAllergenList";
const AppRoutes = () => {

    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SiderMenu><HomePage/></SiderMenu>} />
                    <Route path="/mercurial" element={<SiderMenu><MercurialPage /></SiderMenu>} />
                    <Route path="/creerdT" element={<SiderMenu><DataSheetCreation/></SiderMenu>} />
                    <Route path="/allergenList" element={<SiderMenu><CatAllergenList/></SiderMenu>} />
                    <Route path="/fichetechnique/:id" element={<SiderMenu><DataSheet/></SiderMenu>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};
export default AppRoutes;