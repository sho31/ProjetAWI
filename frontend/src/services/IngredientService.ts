import http from "../http-common";
import IngredientsData from "../types/Ingredient";

const getAllIngredients = async () => {
    const tmp = await http.get<Array<IngredientsData>>("/ingredient/all");
    return tmp.data;
};

const update = async (id: any, data: IngredientsData) => {
    return await http.put<any>(`/ingredient/?id=${id}`, data);
};

const remove = async (id: any) => {
    return await http.delete<any>(`/ingredient/?id=${id}`);
};


const IngredientService = {
    getAllIngredients,
    update,
    remove,
};

export default IngredientService;
