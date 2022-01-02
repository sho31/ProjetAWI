import React, {useState, useEffect, Fragment} from "react";
import CatIngredientService from "../../services/CatIngredientService";
import IngredientService from "../../services/IngredientService";
import ITutorialData from '../../types/Ingredient';
import {Space, Table, Button, Popconfirm, InputNumber} from "antd";

interface Props {
    id: number;
    dom: any;
    updateDom: any;
}

const IngredientsList: React.FC<Props>= (props) => {
    const [ingredients, setIngredients] = useState<Array<ITutorialData>>([]);
    const { Column } = Table;
    const [value, setValue] = useState<number>(0);

    const deleteTutorial = async (id: number) => {
        await IngredientService.remove(id)
            .then(() => {
                props.updateDom(props.dom+1);
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

    }, [props.id,props.dom]);

    const confirm = async (ingredient: ITutorialData) => {
        await deleteTutorial(ingredient.idingredient)
    }

    const cancel = async () => {
    }

    const addStock = async (id:number,newStock: number) => {
            await IngredientService.addStock(id,newStock)
                .then(() => {
                    props.updateDom(props.dom+1);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
    }

    return (
        <Fragment key={1}>
            <Table dataSource={ingredients}  pagination={false} rowKey={"idingredient"} >
                <Column title="Nom ingrédient" dataIndex="nomingredient" key={1} responsive={["xs","sm","md","lg"]} />
                <Column title="Prix" dataIndex="prixunitaireingredient" key={2} responsive={["xs","sm","md","lg"]} />
                <Column title="Quantité" dataIndex="stock" key={3} responsive={["xs","sm","md","lg"]}/>
                <Column title="Unité" dataIndex="nomunite" key={4} responsive={["xs","sm","md","lg"]} />
                <Column
                    title="Supprimer un ingrédient"
                    key={5}
                    responsive={["xs","sm","md","lg"]}
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
                <Column
                    title="Modifier le stock"
                    key={5}
                    render={(ingredient,index) => (
                        <Fragment>
                            <Space size="middle" key={ingredient.idingredient} >
                                <InputNumber min={0} max={10} defaultValue={0} onChange={(id:number) => {setValue(id)}}  style={{width:50}}/>
                            </Space>
                            <Space size="middle" key={ingredient.idingredient+1} >
                                <Button
                                type="primary"
                                onClick={() => {
                                 addStock(ingredient.idingredient,value)}}
                                >
                                Ajouter
                                </Button>
                            </Space>
                        </Fragment>
                    )}
                />
            </Table>
        </Fragment>
    );
};

export default IngredientsList;

