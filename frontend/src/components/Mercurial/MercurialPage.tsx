import React, {useState, useEffect, Fragment} from "react";
import CatIngredientService from "../../services/CatIngredientService";
import CatIngredientData from '../../types/IngredientCat';
import IngredientList from "./IngredientList";
import { Typography } from 'antd';
const { Title } = Typography;

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
        retrieveMercurial().then(() => "ok");
    }, []);

    return (
        <Fragment key={1}>
            <div key={1}>
                <Title level={2} key={1} >Mercurial des ingrédients</Title>
            </div>
            <div key={2}>
                    {catIngredients &&
                    catIngredients.map((catingredient,index) => (
                        <h3 key={index}>
                            {catingredient.nomcategorieingredient}
                            <IngredientList id={catingredient.idcategorieingredient} key={index}/>
                        </h3>
                    ))}
            </div>
        </Fragment>
    );
};

export default MercurialPage;

