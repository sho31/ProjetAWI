import React, { useState, useEffect} from "react";

import StepIngredientJoinService from "../../../services/StepIngredientJoinService";
import SimpleIngredient from "../../../types/SimpleIngredient"

interface Props {
    idDataSheet: number;
    idCatAllergen: number;
}

const AllergenListByDatasheet: React.FC<Props> = (props) => {
    const [allergens, setAllergens] = useState<Array<SimpleIngredient>>([]);

    useEffect(() => {
        const getCatAllergen = async (idDataSheet: number,idCatAllergen: number ) => {
            await StepIngredientJoinService.getAllergenListByCatAndDataSheet(idDataSheet,idCatAllergen)
                .then((response: any) => {
                    setAllergens(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getCatAllergen(props.idDataSheet,props.idCatAllergen);
    }, [props.idDataSheet,props.idCatAllergen]);
    return (
        <div>
            {allergens &&
            allergens.map((allergen,index) => (
                <React.Fragment key={index}>
                    {allergen.nomingredient}<br/>
                </React.Fragment>
            ))}
        </div>
    );
};

export default AllergenListByDatasheet;

