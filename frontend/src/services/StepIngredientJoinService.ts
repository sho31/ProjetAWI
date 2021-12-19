import http from "../http-common";
import RealizationData from "../types/RealizationM";
import AllergenCat from "../types/AllergenCat"
import SimpleIngredient from "../types/SimpleIngredient"


const getAllRealizations = async (id : number) => {
        const tmp = await http.get<Array<RealizationData>>(`/ingredientStepJoin?idEtape=${id}`);
        return tmp.data
};

const getAllergenCat = async (idFicheTechnique : number) => {
    const tmp = await http.get<Array<AllergenCat>>(`/ingredientStepJoin/catallergen?idFicheTechnique=${idFicheTechnique}`);
    return tmp.data
};

const getAllergenListByCatAndDataSheet = async (idFicheTechnique : number,idCatAllergene: number) => {
    const tmp = await http.get<Array<SimpleIngredient>>(`/ingredientStepJoin/allergenlist?idFicheTechnique=${idFicheTechnique}&idCatAllergene=${idCatAllergene}`);
    return tmp.data
};


const IngredientService = {
    getAllRealizations,
    getAllergenCat,
    getAllergenListByCatAndDataSheet,
};

export default IngredientService;
