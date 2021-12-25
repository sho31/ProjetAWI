import http from "../http-common";
import DatasheetsData from "../types/Datasheet";
import DataSheetJoin from "../types/DataSheetJoin";


const create = async (data: DatasheetsData) => {
    const tmp =  await http.post<DatasheetsData>("/datasheet", data);
    console.log(tmp)
    return  tmp.data
};
const createJoin = async (data: DataSheetJoin) => {
    const tmp =  await http.post<DataSheetJoin>("/datasheetJoin", data);
    console.log(tmp)
    return  tmp.data
};
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
    return tmp.data;
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
    create,
    createJoin
};

export default IngredientService;
