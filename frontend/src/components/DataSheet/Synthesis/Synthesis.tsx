import {Card, Col, Row, Switch} from "antd";

import React, {Fragment, useState} from "react";
import CatAllergenByDatasheet from "./CatAllergenByDatasheet";
import CatIngredientList from "./CatIngredientList";
import DatasheetTime from "./DatasheetTime";
import Cost from "./Cost"

interface Props {
    id: number;
    nbCouverts: number;
    theoricalNbCouverts: number;
    decrementStock: boolean;
}

const Synthesis: React.FC<Props> = (props) => {
    const [isCout, setCout] = useState<boolean>(false);

    const buttonHandler = () => {
        setCout((status) => !status);
    };

    return (
        <Card title='Synthèse' bordered={false} key={1}>
            <Row key={1}>
                <Col span={8} key={1}><h3>Ingrédients</h3></Col>
                <Col span={8} key={2}><h3>Allergènes</h3></Col>
                <Col span={8} key={3}><h3>Durée</h3></Col>
            </Row>
            <Row key={2}>
                <Col span={8} key={1}>
                    <CatIngredientList id={props.id} theoricalNbCouverts={props.theoricalNbCouverts} nbCouverts={props.nbCouverts} decrementStock={props.decrementStock} cout={isCout}/>
                </Col>
                <Col span={8} key={2}>
                    <Fragment key={1}>
                        <CatAllergenByDatasheet id={props.id}/>
                    </Fragment>
                </Col>
                <Col span={8} key={3}>
                    <Fragment key={2}>
                        <DatasheetTime id={props.id}/>
                    </Fragment>
                </Col>
            </Row>
            <Row key={3}>
                <Col span={24} key={3}>
                    <div key={1}>
                        <Cost DatasheetId={props.id} nbCouverts={props.nbCouverts} theoricalNbCouverts={props.theoricalNbCouverts} cout={isCout}/>
                    </div>
                </Col>
            </Row>
            <div key={4}>
                <Switch checkedChildren="Avec Cout" unCheckedChildren="Sans Cout" onChange={buttonHandler}/>
                <br />
            </div>
        </Card>
    )};

export default Synthesis;
