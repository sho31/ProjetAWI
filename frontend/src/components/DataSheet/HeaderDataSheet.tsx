import React, {useState, useEffect} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import Image from '../../images/burger.jpg';
import {Card, Col, Row} from "antd";

interface Props {
    id: number;
}


const HeaderDataSheet: React.FC<Props> = (props) => {
    const initialDataSheet = {
        idfichetechnique: null,
        idcategoriefichetechnique: null,
        idauteur: null,
        nomplat: "",
        nombrecouverts: 0,
        image: "",
    };
    const [dataSheet, setdataSheet] = useState<DatasheetData>(initialDataSheet);

    const retrieveTutorials = async () => {
        await DataSheetService.getDataSheetByID(props.id)
            .then((response: any) => {
                setdataSheet(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveTutorials();
    }, []);

    return (

        <div>
            <div className="site-card-border-less-wrapper">
                <Card title={dataSheet.nomplat} bordered={false}>
                    <p><img src={Image} /></p>
                    <p>Nombre de couverts : {dataSheet.nombrecouverts}</p>
                </Card>
            </div>
        </div>
    );
};

export default HeaderDataSheet;
