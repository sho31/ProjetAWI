import React, {useState, useEffect, Fragment} from "react";

import IngredientService from "../../../services/IngredientService";
import StepIngredientJoinService from "../../../services/StepIngredientJoinService";
import SimpleIngredient from "../../../types/SimpleIngredient"
import {Col,Row} from "antd";

interface Props {
    idDataSheet: number;
    idCatIngredient: number;
    cout: boolean;
    theoricalNbCouverts: number;
    nbCouverts: number;
    decrementStock: boolean;
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

        const decrementStock = async (nb: number,decrementStock:boolean ) => {
            if(decrementStock){
                ingredients.map((ingredient) => {
                    IngredientService.updateStock(ingredient.idingredient,Math.round(((ingredient.sumquantite * (props.theoricalNbCouverts/props.nbCouverts)) * 100) / 100));
                })
            }
        }

        decrementStock(props.theoricalNbCouverts, props.decrementStock).then( () => "ok");
        getIngredientList(props.idDataSheet, props.idCatIngredient).then( () => "ok");
    }, [props.idDataSheet,props.idCatIngredient, props.decrementStock]);

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
                        <Col span={12} key={index+1}>{(Math.round((ingredient.sumquantite * (props.theoricalNbCouverts/props.nbCouverts)) * 100) / 100)*ingredient.prixunitaireingredient}€</Col>
                        <br/>
                    </Row>
                </Fragment>
            ))}
        </div>
    );

};

export default IngredientListDataSheet;

