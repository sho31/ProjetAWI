import {Card, Col, Row} from "antd";
import RecursiveRealization from "../Realization/RecursiveRealization";
import React from "react";
import AllergenList from "./CatAllergenList";
import CatAllergenList from "./CatAllergenList";

interface Props {
    id: number;
    nbCouverts: number;
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
                <Col span={8} key={1}><h3></h3></Col>
                <Col span={8} key={2}><h3>
                    <CatAllergenList id={props.id}/>
                </h3></Col>
                <Col span={8} key={3}><h3>Couts</h3></Col>
            </Row>
        </Card>
    )};

export default Synthesis;
