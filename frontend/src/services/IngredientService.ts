import http from "../http-common";
import IngredientsData from "../types/Ingredient";

const getAllIngredients = async () => {
    const tmp = await http.get<Array<IngredientsData>>("/ingredient/all");
    return tmp.data;
};

const updateStock = async (id: any, quantite: number) => {
    return await http.put<any>(`/ingredient/stock?id=${id}&quantite=${quantite}`);
};

const remove = async (id: any) => {
    return await http.delete<any>(`/ingredient/?id=${id}`);
};


const IngredientService = {
    getAllIngredients,
    remove,
    updateStock,
};

export default IngredientService;
