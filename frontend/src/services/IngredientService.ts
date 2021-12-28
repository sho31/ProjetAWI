import http from "../http-common";
import IngredientsData from "../types/Ingredient";

const getAllIngredients = async () => {
    const tmp = await http.get<Array<IngredientsData>>("/ingredient/all");
    return tmp.data;
};

const getAllIngredientsWithNegativeStock = async () => {
    const tmp = await http.get<Array<IngredientsData>>("/ingredient/withnegativestock");
    return tmp.data;
};

const updateStock = async (id: any, quantite: number) => {
    return await http.put<any>(`/ingredient/removestock?id=${id}&quantite=${quantite}`);
};

const addStock = async (id: any, quantite: number) => {
    const res = await http.put<any>(`/ingredient/addstock?id=${id}&quantite=${quantite}`);
    console.log(res);
    return res;
};

const remove = async (id: any) => {
    return await http.delete<any>(`/ingredient/?id=${id}`);
};


const IngredientService = {
    getAllIngredients,
    getAllIngredientsWithNegativeStock,
    remove,
    updateStock,
    addStock,
};

export default IngredientService;
