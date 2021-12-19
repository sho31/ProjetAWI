import React, { useState, useEffect} from "react";

import StepIngredientJoinService from "../../../services/StepIngredientJoinService";
import SimpleIngredient from "../../../types/SimpleIngredient"

interface Props {
    idDataSheet: number;
    idCatAllergen: number;
}

const MercurialPage: React.FC<Props> = (props) => {
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
    }, []);
    return (
        <div>
            <div></div>
            {allergens &&
            allergens.map((allergen) => (
                <>
                    {allergen.nomingredient}<br/>
                </>
            ))}
        </div>
    );
};

export default MercurialPage;

