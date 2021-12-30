import React, {useState} from 'react';
import {Button, message} from 'antd';

import Unit from "../../types/Unit";
import CollectionCreateForm from "./CollectionCreateForm";
import UnitService from "../../services/UnitService";

const UnitCreation = () => {
    const [visible, setVisible] = useState(false);

    const onCreate = async (values: any) => {
        let unit = new Unit(-1,values.name)
        await createCatIngredient(unit);
        setVisible(false);
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

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Nouvelle unité
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                nameCollection={"unité"}/>
        </div>
    );
};

export default UnitCreation;