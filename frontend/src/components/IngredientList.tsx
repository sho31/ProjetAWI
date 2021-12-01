import React, { useState, useEffect} from "react";
import CatIngredientService from "../services/CatIngredientService";
import ITutorialData from '../types/Ingredient';

interface Props {
    id: number;
}

const IngredientsList: React.FC<Props>= (props) => {
    const [ingredients, setIngredients] = useState<Array<ITutorialData>>([]);

    const retrieveIngredients = async () => {
        await CatIngredientService.getIngredientByCat(props.id)
            .then((response: any) => {
                setIngredients(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveIngredients();
    }, []);

    return (
        <div>
            <div>
                <ul>
                    {ingredients &&
                    ingredients.map((ingredient) => (
                        <li>{ingredient.nomingredient} prix : {ingredient.prixunitaireingredient} stock : {ingredient.stock}</li>))}
                </ul>
            </div>
        </div>
    );
};

export default IngredientsList;
