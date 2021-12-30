import {Card, Col, Row} from "antd";

import React from "react";
import CatAllergenByDatasheet from "./CatAllergenByDatasheet";
import CatIngredientList from "./CatIngredientList";
import DatasheetTime from "./DatasheetTime";
import Cost from "../Cost"

interface Props {
    id: number;
    nbCouverts: number;
    theoricalNbCouverts: number;
    decrementStock: boolean;
}

const Synthesis: React.FC<Props> = (props) => {
    return (
        <Card title='Synthèse' bordered={false}>
            <Row key={1}>
                <Col span={8} key={1}><h3>Ingrédients</h3></Col>
                <Col span={8} key={2}><h3>Allergènes</h3></Col>
                <Col span={8} key={3}><h3>Couts</h3></Col>
            </Row>
            <Row key={2}>
                <Col span={8} key={1}>
                    <CatIngredientList id={props.id} theoricalNbCouverts={props.theoricalNbCouverts} nbCouverts={props.nbCouverts} decrementStock={props.decrementStock}/>
                </Col>
                <Col span={8} key={2}><div>
                    <CatAllergenByDatasheet id={props.id}/>
                </div></Col>
                <Col span={8} key={3}>
                    <div key={1}>
                        <DatasheetTime id={props.id}/>
                        {/*
                            <Cost DatasheetId={props.id} nbCouverts={props.nbCouverts}/>
                        */}
                    </div>
                </Col>
            </Row>
        </Card>
    )};

export default Synthesis;
