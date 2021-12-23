import http from "../http-common";
import DatasheetCatsData from "../types/DataSheetCat";

const getAllDataSheetCat = async () => {
    const tmp = await http.get<Array<DatasheetCatsData>>("/datasheetCat/all");
    return tmp.data;
};

const IngredientService = {
    getAllDataSheetCat,
};

export default IngredientService;
