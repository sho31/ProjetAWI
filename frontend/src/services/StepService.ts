import http from "../http-common";
import StepsData from "../types/Step";
import Time from "../types/Time";

const create = async (data: StepsData) => {
    const tmp =  await http.post<StepsData>("/step", data);
    return  tmp.data
};

const getAllDataSheets = async () => {
    const tmp = await http.get<Array<StepsData>>("/step/all");
    return tmp.data;
};

const getStepsByDataSheet = async (id: any) => {
    const tmp = await http.get<Array<StepsData>>(`/step/bydatasheet?id=${id}`);
    return tmp.data;
};

const getGlobalTimeToMakeDataSheet = async (id: number) => {
    const tmp = await http.get<Time>(`/step/globaltime?id=${id}`);
    return tmp.data;
};

const getGlobalTimeToMakeDataSheetChild = async (id: number) => {
    const tmp = await http.get<Time>(`/step/globaltime/child?id=${id}`);
    return tmp.data;
};

const StepService = {
    getAllDataSheets,
    getStepsByDataSheet,
    create,
    getGlobalTimeToMakeDataSheet,
    getGlobalTimeToMakeDataSheetChild,
};

export default StepService;
