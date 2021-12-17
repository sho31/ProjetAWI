import React, {useState, useEffect} from "react";

import {Col, Row} from "antd";

import StepService from "../../services/StepService";
import Step from "../../types/Step";
import IngEtape from "./IngEtape";
import DataSheetService from "../../services/DataSheetService";
import DataSheetJoin from "../../types/DataSheetJoin";
import NameDataSheet from "./NameDataSheet";

interface Props {
    id: number;
    nbCouverts: number;
}

const RecursiveRealization: React.FC<Props> = (props) => {
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

    return (
        <div>
                        {steps && dataSheetJoin?
                        steps.map((step, index) => (
                            <div>{step.numetape === dataSheetJoin.numetape+1 &&
                                <>
                                    <Row>
                                    <Col span={12} key={index+1}><h1>Utilisation d'une nouvelle fiche technique</h1></Col>
                                    <Col span={2} key={index+2}>{dataSheetJoin.numetape}</Col>
                                        <Col span={10} key={index+3}>
                                            <NameDataSheet id={dataSheetJoin.idfichetechniquefille}></NameDataSheet>
                                    </Col>
                                    </Row>
                                    <RecursiveRealization id={dataSheetJoin.idfichetechniquefille} nbCouverts={props.nbCouverts}/>
                                </>
                            }
                            <Row key={index}>
                                <Col span={12} key={index+1}>
                                    <IngEtape id={step.idetape} nbCouverts={props.nbCouverts}></IngEtape>
                                </Col>
                                <Col span={2} key={index+2}>{step.numetape}</Col>
                                <Col span={10} key={index+3}>
                                    <h3>{step.titreetape}
                                        <br></br>
                                        {step.tempsetape}min
                                    </h3>
                                    {step.descriptionetape}
                                    <p></p>
                                </Col>
                            </Row>
                            </div>
                        )) : ( // FICHE Technique fille
                            <div>
                                {steps &&
                                steps.map((step, index) => (
                                    <Row key={index}>
                                        <Col span={12} key={index+1}>
                                            <IngEtape id={step.idetape} nbCouverts={props.nbCouverts}></IngEtape>
                                        </Col>
                                        <Col span={2} key={index+2}>{step.numetape}</Col>
                                        <Col span={10} key={index+3}>
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
        </div>
    );
};

export default RecursiveRealization;
