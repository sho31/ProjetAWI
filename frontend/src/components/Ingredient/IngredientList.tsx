import React, { useState, useEffect} from "react";
import CatIngredientService from "../../services/CatIngredientService";
import IngredientService from "../../services/IngredientService";
import ITutorialData from '../../types/Ingredient';
import {Space, Table,Button,Popconfirm} from "antd";

interface Props {
    id: number;
}

const IngredientsList: React.FC<Props>= (props) => {
    const [ingredients, setIngredients] = useState<Array<ITutorialData>>([]);
    const { Column } = Table;
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

    const confirm = async (ingredient: ITutorialData) => {
        await deleteTutorial(ingredient.idingredient)
    }

    const cancel = async () => {
    }


    return (

        <Table dataSource={ingredients} pagination={false}>
            <Column title="Nom ingrédient" dataIndex="nomingredient" key="nomingredient" />
            <Column title="Prix" dataIndex="prixunitaireingredient" key="prixunitaireingredient" />
            <Column title="Quantité" dataIndex="stock" key="stock" />
            <Column
                title="Action"
                key="action"
                render={(ingredient) => (
                    <Space size="middle">
                        <Popconfirm title="Etes vous sur de vouloir supprimer cet ingrédient？" onConfirm={() => confirm(ingredient)} onCancel={() => cancel()}>
                            <a href="#"><Button type="primary" danger>Delete</Button></a>
                        </Popconfirm>
                    </Space>

                )}
            />
        </Table>
    );
};

export default IngredientsList;

