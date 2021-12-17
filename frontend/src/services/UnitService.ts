import http from "../http-common";
import UnitsData from "../types/Unit";

const getAllUnits = async () => {
    const tmp = await http.get<Array<UnitsData>>("/unit/all");
    return tmp.data;
};

const UnitService = {
    getAllUnits
};

export default UnitService;
