import React, {useState, useEffect, Fragment} from "react";
import CatIngredientService from "../../services/CatIngredientService";
import CatIngredientData from '../../types/IngredientCat';
import IngredientList from "./IngredientList";
import {Card, Select, Typography} from 'antd';
import IngredientToBeRestocked from "./IngredientToBeRestocked";
import { Collapse } from 'antd';
const { Title } = Typography;



const MercurialPage: React.FC = () => {
    const [catIngredients, setCatIngredients] = useState<Array<CatIngredientData>>([]);
    const [currentCatIngredient,setCurrentCatIngredient] = useState<Array<number>>([-1]);
    const { Option } = Select;
    const children = [];
    const { Panel } = Collapse;

    for(let j=0; j<catIngredients.length;j++){
        children.push(<Option value={catIngredients[j].idcategorieingredient} key={catIngredients[j].idcategorieingredient}>{catIngredients[j].nomcategorieingredient}</Option>);
    }

    useEffect(() => {
        const retrieveMercurial = async () => {
            await CatIngredientService.getAllCatIngredients()
                .then((response: any) => {
                    setCatIngredients(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        retrieveMercurial().then(() => "ok");
    }, []);

    function handleChange(value: any) {
        if(value.length>0){
            setCurrentCatIngredient(value);
        }
        else{
            setCurrentCatIngredient([-1]);
        }
    }
    return (
        <Fragment key={1}>
            <div key={1}>
                <Title level={2} key={1} >Mercurial des ingrédients</Title>
            </div>
            <Card key={3}>
                <div key={2}>
                    <IngredientToBeRestocked/>
                </div>
            </Card>
            <br/>
            <Card key={4}>
                <div key={2}>
                    <h3 key={3}>
                        Trier par catégorie d'ingrédient
                    </h3>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '30%'}}
                        placeholder="Choisissez une catégorie"
                        defaultValue={[]}
                        onChange={handleChange}
                    >{children}
                    </Select>
                </div>
            </Card>
            <br/>
            <Card key={2}>
                <div key={3}>
                        {catIngredients &&
                        catIngredients.filter( (catIngredient) => {
                            if (currentCatIngredient[0] === -1) {
                                return catIngredient;
                            } else {
                                for (let i = 0; i < currentCatIngredient.length; i++) {
                                    if (catIngredient.idcategorieingredient === currentCatIngredient[i]) {
                                        return catIngredient
                                    }
                                }
                            }
                            return null;
                        }).
                        map((catingredient,index) => (
                            <h3 key={index}>
                                {catingredient.nomcategorieingredient}
                                <IngredientList id={catingredient.idcategorieingredient}/>
                            </h3>
                        ))}
                </div>
            </Card>
        </Fragment>
    );
};

export default MercurialPage;

