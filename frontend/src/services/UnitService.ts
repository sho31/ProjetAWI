import http from "../http-common";
import UnitData from "../types/Unit";

const create = async (data: UnitData) => {
    const tmp =  await http.post<UnitData>("/unit", data);
    return  tmp.data;
};

const getAllUnits = async () => {
    const tmp = await http.get<Array<UnitData>>("/unit/all");
    return tmp.data;
};

const remove = async (id: any) => {
    const tmp = await http.delete<any>(`/unit/?id=${id}`);
    return tmp.data;
};


const UnitService = {
    create,
    getAllUnits,
    remove,

};

export default UnitService;
