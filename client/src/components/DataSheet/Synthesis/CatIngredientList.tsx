import React, {useState, useEffect, Fragment} from "react";

import StepIngredientJoinService from "../../../services/StepIngredientJoinService";
import IngredientCat from "../../../types/IngredientCat";

import { Switch } from 'antd';
import IngredientListDataSheet from "./IngredientListDataSheet";



interface Props {
    id: number;
    theoricalNbCouverts: number;
    nbCouverts: number;
    decrementStock: boolean;
}

const CatIngredientList: React.FC<Props> = (props) => {
    const [catIngredients, setCatIngredients] = useState<Array<IngredientCat>>([]);
    const [isCout, setCout] = useState<boolean>(false);

    useEffect(() => {
        const getIngredientCatsList = async (idDataSheet: number) => {
            await StepIngredientJoinService.getIngredientCatsList(idDataSheet)
                .then((response: any) => {
                    setCatIngredients(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getIngredientCatsList(props.id).then( () => "ok");
    }, [props.id]);

    const buttonHandler = () => {
        setCout((status) => !status);
    };

    return (
        <Fragment>
            <div key={1}>
                {catIngredients &&
                catIngredients.map((catIngredient,index) => (
                    <div key={index}>
                        <h4>{catIngredient.nomcategorieingredient}</h4>
                        <IngredientListDataSheet idCatIngredient={catIngredient.idcategorieingredient} idDataSheet={props.id} cout={isCout} theoricalNbCouverts={props.theoricalNbCouverts} nbCouverts={props.nbCouverts} decrementStock={props.decrementStock}/>
                        <br/>
                    </div>
                ))}
            </div>
            <div>
                <Switch checkedChildren="Avec Cout" unCheckedChildren="Sans Cout" onChange={buttonHandler}/>
                <br />
            </div>
        </Fragment>
    );
};

export default CatIngredientList;

