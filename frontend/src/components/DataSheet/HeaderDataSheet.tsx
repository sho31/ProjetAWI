import React, {useState, useEffect} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import Image from '../../images/burger.jpg';
import {Card} from "antd";
import Realization from "./Realization";

interface Props {
    id: number;
}

const HeaderDataSheet: React.FC<Props> = (props: Props) => {

    const [dataSheet, setdataSheet] = useState<DatasheetData>();

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

        retrieveTutorials(props.id).then(r => "ok");
    }, [props.id]);

    return (
        <>
            { dataSheet &&
            <p>
                <Card title={dataSheet.nomplat} bordered={false}>
                    <p><img src={Image} /></p>
                    <p>Nombre de couverts : {dataSheet.nombrecouverts}</p>
                </Card>
                <Realization id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts}/>
            </p>
        }
        </>
    );
};

export default HeaderDataSheet;
