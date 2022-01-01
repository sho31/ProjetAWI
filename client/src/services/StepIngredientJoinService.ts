import http from "../http-common";
import RealizationData from "../types/RealizationM";
import AllergenCat from "../types/AllergenCat"
import SimpleIngredient from "../types/SimpleIngredient"
import IngredientCat from "../types/IngredientCat"
import StepIngredientJoin from "../types/StepIngredientJoin";
import StepsData from "../types/Step";

const create = async (data: StepIngredientJoin) => {
    const tmp =  await http.post<StepIngredientJoin>("/ingredientStepJoin", data);
    return  tmp.data
};
const getAllRealizations = async (id : number) => {
        const tmp = await http.get<Array<RealizationData>>(`/ingredientStepJoin?idEtape=${id}`);
        return tmp.data
};

const getAllergenCatsList = async (idFicheTechnique : number) => {
    const tmp = await http.get<Array<AllergenCat>>(`/ingredientStepJoin/catallergen?idFicheTechnique=${idFicheTechnique}`);
    return tmp.data
};

const getAllergenListByCatAndDataSheet = async (idFicheTechnique : number,idCatAllergene: number) => {
    const tmp = await http.get<Array<SimpleIngredient>>(`/ingredientStepJoin/allergenlist?idFicheTechnique=${idFicheTechnique}&idCatAllergene=${idCatAllergene}`);
    return tmp.data
};

const getIngredientCatsList = async (idFicheTechnique : number) => {
    const tmp = await http.get<Array<IngredientCat>>(`/ingredientStepJoin/catingredient?idFicheTechnique=${idFicheTechnique}`);
    return tmp.data
};

const getIngredientListByCatAndDataSheet = async (idFicheTechnique : number,idIngredientCat: number) => {
    const tmp = await http.get<Array<SimpleIngredient>>(`/ingredientStepJoin/ingredientlist?idFicheTechnique=${idFicheTechnique}&idIngredientCat=${idIngredientCat}`);
    return tmp.data
};

const IngredientService = {
    getAllRealizations,
    getAllergenCatsList,
    getAllergenListByCatAndDataSheet,
    getIngredientCatsList,
    getIngredientListByCatAndDataSheet,
    create
};

export default IngredientService;
