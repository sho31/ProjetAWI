import React, {useState, useEffect} from "react";

import {Card, Col, Row} from "antd";

import StepService from "../../services/StepService";
import Step from "../../types/Step";
import IngEtape from "./IngEtape";
import DataSheetService from "../../services/DataSheetService";
import DataSheetJoin from "../../types/DataSheetJoin";

interface Props {
    id: number;
    nbCouverts: number;
}

const Realization: React.FC<Props> = (props) => {
    const [steps, setSteps] = useState<Array<Step>>([]);
    const [dataSheetJoin, setDataSheetJoin] = useState<DataSheetJoin>();

    useEffect( () => {
        const getDataSheetJoin = async (id: number) => {
            await DataSheetService.getDataSheetJoin(id)
                .then((response: any) => {
                    setDataSheetJoin(response);
                })
                .catch((e: Error) => {
                });
        };

        const getAllStepsDataSheet = async (id: number) => {
            await StepService.getStepsByDataSheet(id)
                .then((response: any) => {
                    setSteps(response);
                })
                .catch((e: Error) => {
                });
        };
        getAllStepsDataSheet(props.id).then(r => "ok");
        getDataSheetJoin(props.id).then(r => "ok");
    }, [props.id]);


    const compareStepWithNumEtapeDSJ = async (id: number) => {
        console.log(id)
    };

    return (
        <div>

            <Card title='Technique de Réalisation' bordered={false}>
                <Row>
                    <Col span={4}><h3>Ingrédients</h3>
                    </Col>
                    <Col span={4}><h3>Quantité</h3></Col>
                    <Col span={4}><h3>Unité</h3></Col>
                    <Col span={2}><h3>Numéro</h3></Col>
                    <Col span={10}><h3>Etapes</h3></Col>
                </Row>
                        {steps && dataSheetJoin?
                        steps.map((step, index) => (
                            <div>{step.numetape === dataSheetJoin.numetape+1 &&
                                <Realization id={dataSheetJoin.idfichetechniquefille} nbCouverts={props.nbCouverts}/>
                            }
                            <Row key={index}>
                                <Col span={12} key={index} >
                                    <IngEtape id={step.idetape} nbCouverts={props.nbCouverts}></IngEtape>
                                </Col>
                                <Col span={2}>{step.numetape}</Col>
                                <Col span={10} key={index*100}>
                                    <h3>{step.titreetape}
                                        <br></br>
                                        {step.tempsetape}min
                                    </h3>
                                    {step.descriptionetape}
                                    <p></p>
                                </Col>
                            </Row>
                            </div>
                        )) : (
                            <div>
                                {steps &&
                                steps.map((step, index) => (

                                    <Row key={index}>
                                        <Col span={12} key={index} >
                                            <IngEtape id={step.idetape} nbCouverts={props.nbCouverts}></IngEtape>
                                        </Col>
                                        <Col span={2}>{step.numetape}</Col>
                                        <Col span={10} key={index*100}>
                                            <h3>{step.titreetape}
                                                <br></br>
                                                {step.tempsetape}min
                                            </h3>
                                            {step.descriptionetape}
                                            <p></p>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                            )}
            </Card>
        </div>
    );
};

export default Realization;
