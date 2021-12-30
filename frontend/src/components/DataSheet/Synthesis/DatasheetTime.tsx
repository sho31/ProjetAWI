import React, {useState, useEffect, Fragment} from "react";

import StepService from "../../../services/StepService";
import Time from "../../../types/Time";

import { Switch } from 'antd';
import IngredientListDataSheet from "./IngredientListDataSheet";
import DatasheetData from "../../../types/Datasheet";



interface Props {
    id: number;
}
let initStep = new Time("0");
const DataSheetTime: React.FC<Props> = (props) => {
    const [step1, setTime1] = useState<Time>(initStep);
    const [step2, setTime2] = useState<Time>(initStep);

    useEffect(() => {
        const getGlobalTimeToMakeDataSheet = async (idDataSheet: number) => {
            await StepService.getGlobalTimeToMakeDataSheet(idDataSheet)
                .then((response: any) => {
                    setTime1(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        const getGlobalTimeToMakeDataSheetChild = async (idDataSheet: number) => {
            await StepService.getGlobalTimeToMakeDataSheetChild(idDataSheet)
                .then((response: any) => {
                    setTime2(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getGlobalTimeToMakeDataSheet(props.id).then( () => "ok");
        getGlobalTimeToMakeDataSheetChild(props.id).then( () => "ok");
    }, [props.id]);

    const totalTime = parseFloat(step1.tempsetape)+parseFloat(step2.tempsetape);

    if(step1 && step2){
        return (

            <Fragment>
                <p>Durée: {totalTime}min</p>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <p>Durée: {step1.tempsetape}min</p>
        </Fragment>
    );

};

export default DataSheetTime;

