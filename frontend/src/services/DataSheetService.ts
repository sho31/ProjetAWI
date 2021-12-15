import http from "../http-common";
import DatasheetsData from "../types/Datasheet";
import DataSheetJoin from "../types/DataSheetJoin";


const getAllDataSheets = async () => {
    const tmp = await http.get<Array<DatasheetsData>>("/datasheet/all");
    return tmp.data;
};

const getDataSheetByID = async (id: any) => {
    const tmp = await http.get<Array<DatasheetsData>>(`/datasheet?id=${id}`);
    return tmp.data[0];
};

const getDataSheetJoin = async (id: any) => {
    const tmp = await http.get<Array<DataSheetJoin>>(`/datasheetJoin?idFicheTechniqueParent=${id}`);
    console.log(tmp.data)
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
    getDataSheetJoin,
};

export default IngredientService;
