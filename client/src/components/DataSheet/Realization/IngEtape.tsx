import React, {useState, useEffect} from "react";

import RealizationM from "../../../types/RealizationM";
import RealizationService from "../../../services/StepIngredientJoinService";
import {Col, Row} from "antd";

interface Props {
    id: number;
    nbCouverts: number;
    theoricalNbCouverts: number;
}

const Realization: React.FC<Props> = (props) => {
    const [realizations, setRealizations] = useState<Array<RealizationM>>([]);

    useEffect(() => {
        let unmounted = false;
        const retrieveRealizations = async (id: number) => {
            await RealizationService.getAllRealizations(id)
                .then((response: any) => {
                    if(!unmounted){
                        setRealizations(response);
                    }
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        retrieveRealizations(props.id).then(r => "ok");

        return () => {
            unmounted = true;
        }
    }, [props.id]);
    return (
        <React.Fragment>
            <Row key={props.id}>
                        {realizations &&
                        realizations.map((realization, index) => (
                            <React.Fragment key={index}>
                                    <Col span={8} key={realization.nomingredient}>{realization.nomingredient}</Col>
                                    <Col span={8} key={realization.idingredient}>{ Math.round((realization.quantite * (props.theoricalNbCouverts/props.nbCouverts)) * 100) / 100}</Col>
                                    <Col span={8} key={realization.nomunite}>{realization.nomunite}</Col>
                            </React.Fragment>
                        ))}
            </Row>
            <br></br>
        </React.Fragment>
    );
};

export default Realization;
