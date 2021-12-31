import React, {useEffect, useState} from 'react';
import {Button, Card, message, Popconfirm, Space, Table} from 'antd';

import CollectionCreateForm from "./CollectionCreateForm";

import DataSheetCat from "../../types/DataSheetCat";
import DataSheetCatService from "../../services/DataSheetCatService";

const { Column } = Table;

const DataSheetCatCreation = () => {
    const [visible, setVisible] = useState(false);
    const [catDataSheets, setCatDataSheets] = useState<Array<DataSheetCat>>([]);
    const [update,setUpdate] = useState<boolean>(false);

    useEffect(() => {
        const getCatIngredients = async () => {
            await DataSheetCatService.getAllDataSheetCat()
                .then((response: any) => {
                    setCatDataSheets(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getCatIngredients().then(() => "ok");
        setUpdate(false);
    }, [update]);


    const onCreate = async (values: any) => {
        let dataSheetCat = new DataSheetCat(-1,values.name)
        await createCatDataSheet(dataSheetCat);
        setVisible(false);
        setUpdate(true);
    };

    const createCatDataSheet = async (data: DataSheetCat) => {
        await DataSheetCatService.create(data)
            .then((response: any) => {
                message.success(response.message);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = async (id: number) => {
        await DataSheetCatService.remove(id)
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
            <Card key={1} title={"Ajouter une catégorie de fiche technique"}>
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
                
             nameCollection={"fiche technique"}/>
            </Card>
            <br/>
            <Card key={2} title={"Liste des catégorie de fiche technique"}>
                <Table dataSource={catDataSheets}  pagination={false} rowKey={"idcategoriefichetechnique"} >
                    <Column title="Nom" dataIndex="nomcategoriefichetechnique" key={1} responsive={["xs","sm","md","lg"]} />
                    <Column
                        title="Action"
                        key={5}
                        responsive={["xs","sm","md","lg"]}
                        render={(catDataSheet) => (
                            <Space size="middle" key={catDataSheet.idcategoriefichetechnique} >
                                <Popconfirm title="Etes vous sur de vouloir supprimer cette catégorie ？" onConfirm={() => confirm(catDataSheet.idcategoriefichetechnique)} onCancel={() => cancel()} key={catDataSheet.idcategoriefichetechnique}>
                                    <a href="/" key={catDataSheet.idcategoriefichetechnique}>
                                        <Button type="primary" danger key={catDataSheet.idcategoriefichetechnique}>
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

export default DataSheetCatCreation;