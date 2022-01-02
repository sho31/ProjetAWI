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
import AllergenCatCreation from "./Creations/AllergenCatCreation";
import IngredientCatCreation from "./Creations/IngredientCatCreation";
import DataSheetCatCreation from "./Creations/DataSheetCatCreation";
import UnitCreation from "./Creations/UnitCreation";
import AuthorCreation from "./Creations/AuthorCreation";

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
                    <Route path="/gerer/unite" element={<SiderMenu><UnitCreation/></SiderMenu>} />
                    <Route path="/gerer/catFT" element={<SiderMenu><DataSheetCatCreation/></SiderMenu>} />
                    <Route path="/gerer/catIngredient" element={<SiderMenu><IngredientCatCreation/></SiderMenu>} />
                    <Route path="/gerer/catAllergene" element={<SiderMenu><AllergenCatCreation/></SiderMenu>} />
                    <Route path="/gerer/auteur" element={<SiderMenu><AuthorCreation/></SiderMenu>} />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};
export default AppRoutes;