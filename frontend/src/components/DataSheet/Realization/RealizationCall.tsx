import {Card, Col, Row} from "antd";
import RecursiveRealization from "./RecursiveRealization";
import React from "react";

interface Props {
    id: number;
    nbCouverts: number;
    theoricalNbCouverts: number;
}

const RealizationCall: React.FC<Props> = (props) => {
    return (
        <Card title='Technique de Réalisation' bordered={false}>
            <Row key={1}>
                <Col span={4} key={2}><h3>Ingrédients</h3></Col>
                <Col span={4} key={3}><h3>Quantité</h3></Col>
                <Col span={4} key={4}><h3>Unité</h3></Col>
                <Col span={2} key={5}><h3>Numéro</h3></Col>
                <Col span={10} key={6}><h3>Etapes</h3></Col>
            </Row>
            <RecursiveRealization id={props.id} nbCouverts={props.nbCouverts} key={props.id+6} theoricalNbCouverts={props.theoricalNbCouverts}/>
        </Card>
    )};

export default RealizationCall;
