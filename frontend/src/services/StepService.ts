import http from "../http-common";
import StepsData from "../types/Step";


const getAllDataSheets = async () => {
    const tmp = await http.get<Array<StepsData>>("/step/all");
    return tmp.data;
};

const getStepsByDataSheet = async (id: any) => {
    const tmp = await http.get<Array<StepsData>>(`/step/bydatasheet?id=${id}`);
    return tmp.data;
};

const IngredientService = {
    getAllDataSheets,
    getStepsByDataSheet,

};

export default IngredientService;
