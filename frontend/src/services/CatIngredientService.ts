import http from "../http-common";
import CatIngredientData from "../types/IngredientCat";
import IngredientData from "../types/Ingredient";

const getAllCatIngredients = async () => {
    const tmp = await http.get<Array<CatIngredientData>>("/ingredientCat/all");
    return tmp.data;
};

const getIngredientByCat = async (id: any) => {
    const tmp = await http.get<Array<IngredientData>>(`/ingredientCat/${id}`);
    return tmp.data;
};

const IngredientService = {
    getAllCatIngredients,
    getIngredientByCat
};

export default IngredientService;
