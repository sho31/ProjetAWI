import React, { useState, useEffect} from "react";

import AllergenList from "./AllergenListByDatasheet";

import StepIngredientJoinService from "../../../services/StepIngredientJoinService";
import AllergenCat from "../../../types/AllergenCat";

interface Props {
    id: number;
}

const CatAllergenByDatasheet: React.FC<Props> = (props) => {
    const [catAllergens, setCatAllergens] = useState<Array<AllergenCat>>([]);

    useEffect(() => {
        const getAllergenCatsList = async (idDataSheet: number) => {
            await StepIngredientJoinService.getAllergenCatsList(idDataSheet)
                .then((response: any) => {
                    setCatAllergens(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getAllergenCatsList(props.id).then( () => "ok");
    }, [props.id]);

    return (
        <div key={props.id}>
            {catAllergens &&
            catAllergens.map((catAllergen,index) => (
                <div key={index}>
                    <h4>{catAllergen.categorieallergene}</h4>
                    <AllergenList idDataSheet={props.id} idCatAllergen={catAllergen.idcategorieallergene} key={catAllergen.idcategorieallergene}/>
                    <br/>
                </div>
            ))}
        </div>
    );
};

export default CatAllergenByDatasheet;

