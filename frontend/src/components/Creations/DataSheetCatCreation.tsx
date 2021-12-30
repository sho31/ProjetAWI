import React, {useState} from 'react';
import {Button, message} from 'antd';

import DataSheetCat from "../../types/DataSheetCat";
import DataSheetCatService from "../../services/DataSheetCatService";
import CollectionCreateForm from "./CollectionCreateForm";


const DataSheetCatCreation = () => {
    const [visible, setVisible] = useState(false);

    const onCreate = async (values: any) => {
        let dataSheetCat = new DataSheetCat(-1,values.name)
        await createCatDataSheet(dataSheetCat);
        setVisible(false);
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

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Nouvelle catégorie de fiche technique
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
                
             nameCollection={"fiche technique"}/>
        </div>
    );
};

export default DataSheetCatCreation;