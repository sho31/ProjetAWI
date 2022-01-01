import http from "../http-common";
import DatasheetCatsData from "../types/DataSheetCat";

const create = async (data: DatasheetCatsData) => {
    const tmp =  await http.post<DatasheetCatsData>("/datasheetCat", data);
    return  tmp.data
};

const getAllDataSheetCat = async () => {
    const tmp = await http.get<Array<DatasheetCatsData>>("/datasheetCat/all");
    return tmp.data;
};

const remove = async (id: any) => {
    const tmp = await http.delete<any>(`/datasheetCat/?id=${id}`);
    return tmp.data;
};

const IngredientService = {
    create,
    getAllDataSheetCat,
    remove,
};

export default IngredientService;
