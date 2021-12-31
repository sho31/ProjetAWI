import http from "../http-common";
import IngredientsData from "../types/Ingredient";

const create = async (data: IngredientsData) => {
    const tmp =  await http.post<IngredientsData>("/ingredient", data);
    return  tmp.data
};
const getAllIngredients = async () => {
    const tmp = await http.get<Array<IngredientsData>>("/ingredient/all");
    return tmp.data;
};
const getIngredientByID = async (id: any) => {
    const tmp = await http.get<Array<IngredientsData>>(`/ingredient?id=${id}`);
    return tmp.data[0];
};

const getAllIngredientsWithNegativeStock = async () => {
    const tmp = await http.get<Array<IngredientsData>>("/ingredient/withnegativestock");
    return tmp.data;
};

const getAllIngredientByAllergenCat = async (id: number) => {
    const tmp = await http.get<Array<IngredientsData>>(`/ingredient/bycatallergen?id=${id}`);
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
    getAllIngredientByAllergenCat,
    remove,
    updateStock,
    addStock,
    getIngredientByID,
    create
};

export default IngredientService;
