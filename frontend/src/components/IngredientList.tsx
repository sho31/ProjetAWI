import React, { useState, useEffect} from "react";
import CatIngredientService from "../services/CatIngredientService";
import IngredientService from "../services/IngredientService";
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

    const deleteTutorial = async (id: number) => {
        await IngredientService.remove(id)
            .then((response: any) => {
                console.log(response.data);
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
                        <li key={ingredient.idingredient}>{ingredient.nomingredient} prix : {ingredient.prixunitaireingredient} stock : {ingredient.stock}
                            <button className="badge badge-danger mr-2"
                                    onClick={() => deleteTutorial(ingredient.idingredient)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default IngredientsList;
