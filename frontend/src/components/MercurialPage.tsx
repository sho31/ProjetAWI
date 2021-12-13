import React, { useState, useEffect} from "react";
import CatIngredientService from "../services/CatIngredientService";
import CatIngredientData from '../types/CatIngredient';
import IngredientList from "./Ingredient/IngredientList";
import { Typography, Space } from 'antd';
const { Title, Link } = Typography;

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
            <div><Title level={2} >Mercurial des ingrédients</Title></div>
                    {catIngredients &&
                    catIngredients.map((catingredient) => (
                        <h3 key={catingredient.idcategorieingredient}>
                            {catingredient.nomcategorieingredient}
                            <IngredientList id={catingredient.idcategorieingredient}></IngredientList>
                        </h3>
                    ))}
        </div>
    );
};

export default MercurialPage;

