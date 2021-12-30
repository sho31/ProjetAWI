import http from "../http-common";
import AllergenCat from "../types/AllergenCat";

const create = async (data: AllergenCat) => {
    const tmp =  await http.post<AllergenCat>("/allergenCat", data);
    return  tmp.data
};

const getAllAllergenCat = async () => {
    const tmp = await http.get<Array<AllergenCat>>("/allergenCat/all");
    return tmp.data;
};

const remove = async (id: any) => {
    const tmp = await http.delete<any>(`/allergenCat/?id=${id}`);
    return tmp.data;
};

const AllergenCatService = {
    create,
    getAllAllergenCat,
    remove,
};

export default AllergenCatService;
