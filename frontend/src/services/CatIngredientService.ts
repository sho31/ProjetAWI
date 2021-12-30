import http from "../http-common";
import CatIngredientData from "../types/IngredientCat";
import IngredientData from "../types/Ingredient";


const create = async (data: CatIngredientData) => {
    const tmp =  await http.post<CatIngredientData>("/ingredientCat", data);
    return  tmp.data
};

const getAllCatIngredients = async () => {
    const tmp = await http.get<Array<CatIngredientData>>("/ingredientCat/all");
    return tmp.data;
};

const getIngredientByCat = async (id: any) => {
    const tmp = await http.get<Array<IngredientData>>(`/ingredientCat/allingredients?id=${id}`);
    return tmp.data;
};

const remove = async (id: any) => {
    const tmp = await http.delete<any>(`/ingredientCat/?id=${id}`);
    return tmp.data;
};


const CatIngredientService = {
    create,
    getAllCatIngredients,
    getIngredientByCat,
    remove,
};

export default CatIngredientService;
