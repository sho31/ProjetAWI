import React, {useEffect, useState} from 'react';
import {Button, Card, message, Popconfirm, Space, Table} from 'antd';

import CollectionCreateForm from "./CollectionCreateForm";

import Unit from "../../types/Unit";
import UnitService from "../../services/UnitService";
import DataSheetCatService from "../../services/DataSheetCatService";

const { Column } = Table;

const UnitCreation = () => {
    const [visible, setVisible] = useState(false);
    const [units, setUnits] = useState<Array<Unit>>([]);
    const [update,setUpdate] = useState<boolean>(false);

    useEffect(() => {
        const getCatIngredients = async () => {
            await UnitService.getAllUnits()
                .then((response: any) => {
                    setUnits(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getCatIngredients().then(() => "ok");
        setUpdate(false);
    }, [update]);


    const onCreate = async (values: any) => {
        let unit = new Unit(-1,values.name)
        await createCatIngredient(unit);
        setVisible(false);
        setUpdate(true);
    };

    const createCatIngredient = async (data: Unit) => {
        await UnitService.create(data)
            .then((response: any) => {
                message.success(response.message);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteTutorial = async (id: number) => {
        await UnitService.remove(id)
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
            <Card key={1} title={"Ajouter une unité"}>
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
                nameCollection={"unité"}/>
            </Card>
            <br/>
            <Card key={2} title={"Liste des catégorie d'unité"}>
                <Table dataSource={units}  pagination={false} rowKey={"idunite"} >
                    <Column title="Nom" dataIndex="nomunite" key={1} responsive={["xs","sm","md","lg"]} />
                    <Column
                        title="Action"
                        key={5}
                        responsive={["xs","sm","md","lg"]}
                        render={(unit) => (
                            <Space size="middle" key={unit.idunite} >
                                <Popconfirm title="Etes vous sur de vouloir supprimer cette catégorie ？" onConfirm={() => confirm(unit.idunite)} onCancel={() => cancel()} key={unit.idunite}>
                                    <a href="/" key={unit.idunite}>
                                        <Button type="primary" danger key={unit.idunite}>
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

export default UnitCreation;