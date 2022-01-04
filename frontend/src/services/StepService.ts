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
const verifyStepOrder = (values : any) : boolean => {
    console.log(values,"val")
    let correctStepOrder : boolean = true;
    let stepNumbers: number[] = [];
    //Verify if two steps don't have the same number
    if(values.fichetechniquejointure !== undefined) {
        for (let k = 0 ; k < values.fichetechniquejointure.length; k++) {
            if(stepNumbers.includes(values.fichetechniquejointure[k].stepnumber) ) {
                return false;
            }else{
                stepNumbers.push(values.fichetechniquejointure[k].stepnumber);
            }
        }
    }

    for (let k = 0 ; k < values.etapes.length; k++) {
        if(stepNumbers.includes(values.etapes[k].numetape) ) {
            return false;
        }else{
            stepNumbers.push(values.etapes[k].numetape);
        }
    }
    //Verify that each step number follows the previous one
    stepNumbers = stepNumbers.sort()
    console.log("ordered steps", stepNumbers)
    for (let i = 0; i < stepNumbers.length; i++) {
        if(i+1 != stepNumbers[i]) {
            return false;
        }
    }
    return correctStepOrder
}
const StepService = {
    getAllDataSheets,
    getStepsByDataSheet,
    create,
    getGlobalTimeToMakeDataSheet,
    getGlobalTimeToMakeDataSheetChild,
    verifyStepOrder
};

export default StepService;
