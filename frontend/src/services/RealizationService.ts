import http from "../http-common";
import RealizationData from "../types/RealizationM";

const getAllRealizations = async (id : any) => {
        const tmp = await http.get<Array<RealizationData>>(`/ingredientStepJoin?idEtape=${id}`);
        return tmp.data
};


const IngredientService = {
    getAllRealizations,
};

export default IngredientService;
