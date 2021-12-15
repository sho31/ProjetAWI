import React, {useState, useEffect} from "react";

import {Card, Col, Row} from "antd";

import StepService from "../../services/StepService";
import Step from "../../types/Step";
import IngEtape from "./IngEtape";

interface Props {
    id: number;
    nbCouverts: number;
}

const Realization: React.FC<Props> = (props) => {
    const [steps, setSteps] = useState<Array<Step>>([]);


    useEffect( () => {
        const retrieveMercurial = async (id: number) => {
            await StepService.getStepsByDataSheet(id)
                .then((response: any) => {
                    setSteps(response);
                })
                .catch((e: Error) => {
                });
        };
        retrieveMercurial(props.id).then(r => "ok");
    }, [props.id]);

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

                        {steps &&
                        steps.map((step, index) => (

                            <Row key={index}>
                                <Col span={12} key={index} >
                                    <IngEtape id={step.idetape} nbCouverts={props.nbCouverts}></IngEtape>
                                </Col>
                                <Col span={12} key={index*100}>
                                    <h3>Etape {step.numetape}: {step.titreetape}
                                        <br></br>
                                        {step.tempsetape}min
                                    </h3>
                                    {step.descriptionetape}
                                    <p></p>
                                </Col>
                            </Row>

                        ))}
            </Card>
        </div>
    );
};

export default Realization;
