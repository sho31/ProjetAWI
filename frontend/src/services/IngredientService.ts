import http from "../http-common";
import IngredientsData from "../types/Ingredient";

const getAllIngredients = async () => {
    const tmp = await http.get<Array<IngredientsData>>("/ingredient/all");
    return tmp.data;
};

const IngredientService = {
    getAllIngredients,
};

export default IngredientService;
