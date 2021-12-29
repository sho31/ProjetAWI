import React, {useState, useEffect, Fragment} from "react";

import AllergenCatService from "../../services/AllergenCatService";
import AllergenCat from '../../types/AllergenCat';

import {Card, Select, Typography} from 'antd';
import AllergenList from "./AllergenList";
const { Title } = Typography;


const MercurialPage: React.FC = () => {
    const [allergenCats, setAllergenCats] = useState<Array<AllergenCat>>([]);
    const [currentAllergenCat,setCurrentAllergenCat] = useState<Array<number>>([-1]);
    const { Option } = Select;
    const children = [];

    for(let j=0; j<allergenCats.length;j++){
        children.push(<Option value={allergenCats[j].idcategorieallergene} key={allergenCats[j].idcategorieallergene}>{allergenCats[j].categorieallergene}</Option>);
    }

    useEffect(() => {
        const retrieveMercurial = async () => {
            await AllergenCatService.getAllAllergenCat()
                .then((response: any) => {
                    setAllergenCats(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        retrieveMercurial().then(() => "ok");
    }, []);

    function handleChange(value: any) {
        if(value.length>0){
            setCurrentAllergenCat(value);
        }
        else{
            setCurrentAllergenCat([-1]);
        }
    }
    return (
        <Fragment key={1}>
            <div key={1}>
                <Title level={2} key={1} >Liste des allergènes</Title>
            </div>
            <br/>
            <Card key={4}>
                <div key={2}>
                    <h3 key={3}>
                        Trier par catégorie d'allergène
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
                    {allergenCats &&
                    allergenCats.filter( (catIngredient) => {
                        if (currentAllergenCat[0] === -1) {
                            return catIngredient;
                        } else {
                            for (let i = 0; i < currentAllergenCat.length; i++) {
                                if (catIngredient.idcategorieallergene === currentAllergenCat[i]) {
                                    return catIngredient
                                }
                            }
                        }
                        return null;
                    }).
                    map((catingredient,index) => (
                        <h3 key={index}>
                            {catingredient.categorieallergene}
                            <AllergenList idCatAllergen={catingredient.idcategorieallergene}/>
                        </h3>
                    ))}
                </div>
            </Card>
        </Fragment>
    );
};

export default MercurialPage;

