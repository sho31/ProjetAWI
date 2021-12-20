import React, {useState, useEffect, Fragment} from "react";

import StepIngredientJoinService from "../../../services/StepIngredientJoinService";
import SimpleIngredient from "../../../types/SimpleIngredient"
import {Col,Row} from "antd";

interface Props {
    idDataSheet: number;
    idCatIngredient: number;
    cout: boolean;
}

const IngredientListDataSheet: React.FC<Props> = (props) => {
    const [ingredients, setIngredients] = useState<Array<SimpleIngredient>>([]);

    useEffect(() => {
        const getIngredientList = async (idDataSheet: number,idCatIngredient: number) => {
            await StepIngredientJoinService.getIngredientListByCatAndDataSheet(idDataSheet,idCatIngredient)
                .then((response: any) => {
                    setIngredients(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        getIngredientList(props.idDataSheet, props.idCatIngredient).then( () => "ok");
    }, [props.idDataSheet,props.idCatIngredient]);
    if (!props.cout) {
        return (
            <div>
                <div key={props.idCatIngredient}></div>
                {ingredients &&
                ingredients.map((ingredient,index) => (
                    <Fragment key={index}>
                        {ingredient.nomingredient}<br/>
                    </Fragment>

                ))}
            </div>
        );
    }
    return (
        <div>
            <div key={props.idCatIngredient}></div>
            {ingredients &&
            ingredients.map((ingredient,index) => (
                <Fragment key={index}>
                    <Row key={index}>
                        <Col span={12} key={index}>{ingredient.nomingredient}</Col>
                        <Col span={12} key={index+1}>{1}€</Col>
                        <br/>
                    </Row>
                </Fragment>
            ))}
        </div>
    );

};

export default IngredientListDataSheet;

