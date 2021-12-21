import React, {useState, useEffect} from "react";

import DataSheetService from "../../../services/DataSheetService";
import DatasheetData from "../../../types/Datasheet";

interface Props {
    id: number;
    nbCouvertsParents: number;
    theoricalNbCouverts: number;
}

let initDataSheet = new DatasheetData(0,0,0,"","",0,"");

const NameDataSheet: React.FC<Props> = (props) => {

    const [dataSheet, setdataSheet] = useState<DatasheetData>(initDataSheet);

    useEffect(() => {
        const retrieveTutorials = async (id : number) => {
            await DataSheetService.getDataSheetByID(id)
                .then((response: any) => {
                    setdataSheet(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        retrieveTutorials(props.id).then( () => "ok");
    }, [props.id]);
    return (
       <h1>{dataSheet.nomplat} (Attention pour {Math.round((dataSheet.nombrecouverts*(props.theoricalNbCouverts/props.nbCouvertsParents))*1)/1} personnes)</h1>
    )};

export default NameDataSheet;
