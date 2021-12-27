import React, {useState, useEffect, Fragment} from "react";
import CatIngredientService from "../../services/CatIngredientService";
import IngredientService from "../../services/IngredientService";
import ITutorialData from '../../types/Ingredient';
import {Space, Table, Button, Popconfirm} from "antd";

interface Props {
    id: number;
}

const IngredientsList: React.FC<Props>= (props) => {
    const [ingredients, setIngredients] = useState<Array<ITutorialData>>([]);
    const { Column } = Table;

    const deleteTutorial = async (id: number) => {
        await IngredientService.remove(id)
            .then((response: any) => {
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        const retrieveIngredients = async () => {
            await CatIngredientService.getIngredientByCat(props.id)
                .then((response: any) => {
                    setIngredients(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        retrieveIngredients().then( () => "ok");
    }, [props.id]);

    const confirm = async (ingredient: ITutorialData) => {
        await deleteTutorial(ingredient.idingredient)
    }

    const cancel = async () => {
    }

    return (
        <Fragment key={1}>
            <Table dataSource={ingredients}  pagination={false} rowKey={"idingredient"} >
                <Column title="Nom ingrédient" dataIndex="nomingredient" key={1}  />
                <Column title="Prix" dataIndex="prixunitaireingredient" key={2} />
                <Column title="Quantité" dataIndex="stock" key={3} />
                <Column title="Unité" dataIndex="nomunite" key={4} />
                <Column
                    title="Action"
                    key={4}
                    render={(ingredient,index) => (
                        <Space size="middle" key={ingredient.idingredient} >
                            <Popconfirm title="Etes vous sur de vouloir supprimer cet ingrédient？" onConfirm={() => confirm(ingredient)} onCancel={() => cancel()} key={ingredient.idingredient}>
                                <a href="/" key={ingredient.idingredient}>
                                    <Button type="primary" danger key={ingredient.idingredient}>
                                        Supprimer
                                    </Button>
                                </a>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
        </Fragment>
    );
};

export default IngredientsList;

