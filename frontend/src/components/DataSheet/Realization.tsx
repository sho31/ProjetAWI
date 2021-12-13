import React, {useState, useEffect} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import Image from '../../images/burger.jpg';
import {Card, Col, Row} from "antd";

interface Props {
    id: number;
}


const Realization: React.FC<Props> = (props) => {
    return (
        <div>
            <Card title='Technique de Réalisation' bordered={false}>
                <Row>
                    <Col span={4}><h3>Ingrédients</h3>
                    </Col>
                    <Col span={4}><h3>Quantité</h3></Col>
                    <Col span={4}><h3>Unité</h3></Col>
                    <Col span={12}><h3>Etapes</h3></Col>
                </Row>
            </Card>
        </div>
    );
};

export default Realization;
