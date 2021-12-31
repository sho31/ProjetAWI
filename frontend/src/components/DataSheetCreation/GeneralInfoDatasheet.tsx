import React, {useEffect, useState} from 'react';
import { Form, Input, Select, InputNumber, Button, Upload } from 'antd';
import imageUpload from './imageUpload'
import { UploadOutlined} from '@ant-design/icons';
import axios from 'axios';
import datasheetCatService from '../../services/DataSheetCatService'
import DataSheetCat from "../../types/DataSheetCat";
import AuthorService from "../../services/AuthorService";
import Author from "../../types/Author";
const Option = Select.Option;



//TODO upload d'image
const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

// @ts-ignore
// @ts-ignore
const GeneralInfoDatasheet: React.FC<DatasheetProps> = ({ onChange, fields, onFinish}) => {
    const [categoriefichetechnique, setDatasheetCat] = useState<Array<DataSheetCat>>([]);
    const [author, setAuthors] = useState<Array<Author>>([]);
    useEffect( () => {
        datasheetCatService.getAllDataSheetCat()
            .then((response: any) => {
                setDatasheetCat(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        AuthorService.getAllAuthors()
            .then((response: any) => {
                setAuthors(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, []);


    return (
        <div>
            <Form
                name="general_info"
                layout="vertical"
                size = "large"
                fields={fields}
                onFieldsChange={(_, allFields) => {
                    onChange(allFields);
                }}
                onFinish={(values) => {
                    onFinish(values);
                }}

            >
                <Form.Item
                    name="nomplat"
                    label="Titre du plat"
                    rules={[{ required: true, message: 'Ce champs est requis!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="idauteur"
                    label="Nom de l'auteur"
                    rules={[{ required: true, message: "Il faut sélectionner l'auteur" }]}
                >
                    <Select placeholder="Auteur">
                        {author.map((item :Author) => <Select.Option key={item.idauteur} value={item.idauteur}>{item.nomauteur}</Select.Option>)}
                    </Select>

                </Form.Item>
                <Form.Item
                    name="idcategoriefichetechnique"
                    label="Catégorie de fiche technique"
                    rules={[{ required: true, message: 'Il faut sélectionner une catégorie de fiche technique' }]}
                >
                    <Select placeholder="Catégorie de fiche technique">
                        {categoriefichetechnique.map((item :DataSheetCat) => <Select.Option key={item.idcategoriefichetechnique} value={item.idcategoriefichetechnique}>{item.nomcategoriefichetechnique}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Nombre de couverts">
                    <Form.Item name="nombrecouverts"
                               rules={[{ required: true, message: 'Il faut entrer le nombre de couverts de la fiche technique!' }]}
                    >
                        <InputNumber min={1} max={50} />
                    </Form.Item>

                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Aperçu de la recette"
                >
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Suivant
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
}




export default GeneralInfoDatasheet