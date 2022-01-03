import React from "react";
import {useEffect, useState} from "react";

import StepIngredientJoinService from "../../services/IngredientService";
import SimpleIngredient from "../../types/SimpleIngredient"
import {Table} from "antd";

interface Props {
    idCatAllergen: number;
}

const { Column } = Table;

const MercurialPage: React.FC<Props> = (props) => {
    const [allergens, setAllergens] = useState<Array<SimpleIngredient>>([]);

    useEffect(() => {
        const getCatAllergen = async (idCatAllergen: number ) => {
            await StepIngredientJoinService.getAllIngredientByAllergenCat(idCatAllergen)
                .then((response: any) => {
                    console.log(response)
                    setAllergens(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getCatAllergen(props.idCatAllergen);
    }, [props.idCatAllergen]);
    return (
        <div>
            <Table dataSource={allergens}  pagination={false} rowKey={"idingredient"} >
                <Column title="Nom ingrédient" dataIndex="nomingredient" key={1} responsive={["xs","sm","md","lg"]} />
                <Column title="Prix" dataIndex="prixunitaireingredient" key={2} responsive={["xs","sm","md","lg"]} />
                <Column title="Quantité" dataIndex="stock" key={3} responsive={["xs","sm","md","lg"]}/>
                <Column title="Unité" dataIndex="nomunite" key={4} responsive={["xs","sm","md","lg"]} />
            </Table>
        </div>
    );
};

export default MercurialPage;

