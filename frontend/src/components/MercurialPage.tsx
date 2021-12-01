import React, { useState, useEffect} from "react";
import CatIngredientService from "../services/CatIngredientService";
import CatIngredientData from '../types/CatIngredient';
import Ingredient from "./IngredientList";

const MercurialPage: React.FC = () => {
    const [catIngredients, setCatIngredients] = useState<Array<CatIngredientData>>([]);
    const retrieveMercurial = async () => {
        await CatIngredientService.getAllCatIngredients()
            .then((response: any) => {
                setCatIngredients(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveMercurial();
    }, []);

    return (
        <div>
            <div>
                <h2>Mercurial</h2>
                <h3>Ajouter des ingrédients</h3>

                <h3>Liste des ingrédients</h3>
                <ul>
                    {catIngredients &&
                    catIngredients.map((catIngredient) => (
                        <li  key="unique">{catIngredient.nomcategorieingredient}
                            <Ingredient id={catIngredient.idcategorieingredient}>
                            </Ingredient>
                        </li>
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default MercurialPage;
