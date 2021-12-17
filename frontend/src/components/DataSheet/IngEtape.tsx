import React, {useState, useEffect} from "react";

import RealizationM from "../../types/RealizationM";
import RealizationService from "../../services/RealizationService";
import {Col, Row} from "antd";

interface Props {
    id: number;
    nbCouverts: number;
}

const Realization: React.FC<Props> = (props) => {
    const [realizations, setRealizations] = useState<Array<RealizationM>>([]);

    useEffect(() => {
        const retrieveRealizations = async (id: number) => {
            await RealizationService.getAllRealizations(id)
                .then((response: any) => {
                    setRealizations(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        retrieveRealizations(props.id);
    }, [props.id]);
    return (
        <>
            <Row key={1}>
                        {realizations &&
                        realizations.map((realization) => (
                            <>
                                    <Col span={8} key={realization.idetape}>{realization.nomingredient}</Col>
                                    <Col span={8} key={realization.idetape+1}>{ realization.quantite * props.nbCouverts}</Col>
                                    <Col span={8} key={realization.idetape+2}>{realization.nomunite}</Col>
                            </>
                        ))}
            </Row>
            <br></br>
        </>
    );
};

export default Realization;
