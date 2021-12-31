import React, {useEffect, useState} from 'react';
import {Button,message,Table, Space, Popconfirm, Card} from 'antd';

import IngredientCat from "../../types/IngredientCat";
import CatIngredientService from "../../services/CatIngredientService";
import CollectionCreateForm from "./CollectionCreateForm";

const { Column } = Table;
const CollectionsPage = () => {
    const [visible, setVisible] = useState(false);
    const [catIngredients, setCatIngredients] = useState<Array<IngredientCat>>([]);
    const [update,setUpdate] = useState<boolean>(false);

    useEffect(() => {
        const getCatIngredients = async () => {
            await CatIngredientService.getAllCatIngredients()
                .then((response: any) => {
                    setCatIngredients(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getCatIngredients().then(() => "ok");
        setUpdate(false);
    }, [update]);

    const onCreate = async (values: any) => {
        let catIngredient = new IngredientCat(-1,values.name)
        await createCatIngredient(catIngredient);
        setVisible(false);
        setUpdate(true);
    };

    const createCatIngredient = async (data: IngredientCat) => {
        await CatIngredientService.create(data)
            .then((response: any) => {
                message.success(response.message);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = async (id: number) => {
        await CatIngredientService.remove(id)
            .then((response: any) => {
                message.success(response.message)
                setUpdate(true);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const confirm = async (id: number) => {
        await deleteTutorial(id)
    }

    const cancel = async () => {
    }

    return (
        <div>
            <Card key={1} title={"Ajouter une catégorie d'ingrédient"}>
                <Button
                    type="primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                >
                    Ajouter
                </Button>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                 nameCollection={"ingrédient"}/>
            </Card>
            <br/>
            <Card key={2} title={"Liste des catégorie d'ingrédient"}>
                <Table dataSource={catIngredients}  pagination={false} rowKey={"idcategorieingredient"} >
                    <Column title="Nom" dataIndex="nomcategorieingredient" key={1} responsive={["xs","sm","md","lg"]} />
                    <Column
                        title="Action"
                        key={5}
                        responsive={["xs","sm","md","lg"]}
                        render={(catingredient) => (
                            <Space size="middle" key={catingredient.idcategorieingredient} >
                                <Popconfirm title="Etes vous sur de vouloir supprimer cette catégorie ？" onConfirm={() => confirm(catingredient.idcategorieingredient)} onCancel={() => cancel()} key={catingredient.idcategorieingredient}>
                                    <a href="/" key={catingredient.idcategorieingredient}>
                                        <Button type="primary" danger key={catingredient.idcategorieingredient}>
                                            Supprimer
                                        </Button>
                                    </a>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
            </Card>
        </div>
    );
};

export default CollectionsPage;