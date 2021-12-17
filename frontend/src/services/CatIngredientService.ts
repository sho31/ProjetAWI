import http from "../http-common";
import ITCatIngredientData from "../types/CatIngredient";
import ITIngredientData from "../types/Ingredient";

const getAllCatIngredients = async () => {
    const tmp = await http.get<Array<ITCatIngredientData>>("/ingredientCat/all");
    return tmp.data;
};

const getIngredientByCat = async (id: any) => {
    const tmp = await http.get<Array<ITIngredientData>>(`/ingredientCat/${id}`);
    return tmp.data;
};

const IngredientService = {
    getAllCatIngredients,
    getIngredientByCat
};

export default IngredientService;
