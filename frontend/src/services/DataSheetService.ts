import http from "../http-common";
import DatasheetsData from "../types/Datasheet";


const getAllDataSheets = async () => {
    const tmp = await http.get<Array<DatasheetsData>>("/datasheet/all");
    return tmp.data;
};

const getDataSheetByID = async (id: any) => {
    const tmp = await http.get<Array<DatasheetsData>>(`/datasheet?id=${id}`);
    return tmp.data[0];
};

const getStepsByDataSheet = async () => {
    const tmp = await http.get<Array<DatasheetsData>>("/datasheet/all");
    return tmp.data;
};

const IngredientService = {
    getAllDataSheets,
    getDataSheetByID,
    getStepsByDataSheet,

};

export default IngredientService;
