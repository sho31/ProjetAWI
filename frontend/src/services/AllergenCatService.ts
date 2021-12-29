import http from "../http-common";
import AllergenCat from "../types/AllergenCat";

const getAllAllergenCat = async () => {
    const tmp = await http.get<Array<AllergenCat>>("/allergenCat/all");
    return tmp.data;
};


const AllergenCatService = {
    getAllAllergenCat,
};

export default AllergenCatService;
