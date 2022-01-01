import React, {useEffect, useState} from 'react';
import {Button, Card, message, Popconfirm, Space, Table} from 'antd';

import AllergenCat from "../../types/AllergenCat";
import AllergenCatService from "../../services/AllergenCatService";
import CollectionCreateForm from "./CollectionCreateForm";

const { Column } = Table;

const CollectionsPage = () => {
    const [visible, setVisible] = useState(false);

    const [catAllergens, setCatAllergens] = useState<Array<AllergenCat>>([]);
    const [update,setUpdate] = useState<boolean>(false);

    useEffect(() => {
        const getCatAllergen = async () => {
            await AllergenCatService.getAllAllergenCat()
                .then((response: any) => {
                    setCatAllergens(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getCatAllergen().then(() => "ok");
        setUpdate(false);
    }, [update]);

    const onCreate = async (values: any) => {
        let allergenCat = new AllergenCat(-1,values.name)
        await createCatAllergen(allergenCat);
        setVisible(false);
        setUpdate(true);
    };

    const createCatAllergen = async (data: AllergenCat) => {
        await AllergenCatService.create(data)
            .then((response: any) => {
                message.success(response.message);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = async (id: number) => {
        await AllergenCatService.remove(id)
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
            <Card key={1} title={"Ajouter une catégorie d'allergène"}>
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
                nameCollection={"allergène"}
            />
            </Card>
            <br/>
            <Card key={2} title={"Liste des catégorie d'allergène"}>
                <Table dataSource={catAllergens}  pagination={false} rowKey={"idcategorieallergene"} >
                    <Column title="Nom" dataIndex="categorieallergene" key={1} responsive={["xs","sm","md","lg"]} />
                    <Column
                        title="Action"
                        key={5}
                        responsive={["xs","sm","md","lg"]}
                        render={(catallergen) => (
                            <Space size="middle" key={catallergen.idcategorieallergene} >
                                <Popconfirm title="Etes vous sur de vouloir supprimer cette catégorie ？" onConfirm={() => confirm(catallergen.idcategorieallergene)} onCancel={() => cancel()} key={catallergen.idcategorieallergene}>
                                    <a href="/" key={catallergen.id}>
                                        <Button type="primary" danger key={catallergen.idcategorieallergene}>
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