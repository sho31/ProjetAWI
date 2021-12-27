import {Card, Col, Row} from "antd";

import React, {useEffect, useState} from "react";
import CatAllergenList from "./../Synthesis/CatAllergenList";
import CatIngredientList from "./../Synthesis/CatIngredientList";
import DatasheetData from "../../../types/Datasheet";
import DataSheetService from "../../../services/DataSheetService";

interface Props {
    id: number;
}

let initDataSheet = new DatasheetData(0,0,0,"","",0,"");

const TakeAwayCall: React.FC<Props> = (props) => {

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
        <Card title='Etiquette à emporter' bordered={false}>
            <Row key={1}>
                <Col span={8} key={3}><h3>Nom plat</h3></Col>
                <Col span={8} key={1}><h3>Ingrédients</h3></Col>
                <Col span={8} key={2}><h3>Allergènes</h3></Col>
            </Row>
            <Row key={2}>
                <Col span={8} key={3}><h3>{dataSheet.nomplat}</h3></Col>
                <Col span={8} key={1}>
                    <CatIngredientList id={props.id} theoricalNbCouverts={0} nbCouverts={0} decrementStock={false}/>
                </Col>
                <Col span={8} key={2}><div>
                    <CatAllergenList id={props.id}/>
                </div></Col>
            </Row>
        </Card>
    )};

export default TakeAwayCall;
