import React, {useEffect, useState} from 'react';
import {Button, Modal, Form, Input, Select, InputNumber} from 'antd';
import CatIngredientService from "../../services/CatIngredientService";
import IngredientCat from "../../types/IngredientCat";
import UnitService from "../../services/UnitService";
import Unit from "../../types/Unit";
import AllergenCatService from "../../services/AllergenCatService";
import AllergenCat from "../../types/AllergenCat"

interface Values {
    idcategorieingredient: number | null;
    idcategorieallergene: number | null;
    idunite: number | null;
    nomingredient: string;
    prixunitaireingredient: number;
    stock: number;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
}

interface IngredientFormProps {
    onCreateForm: (values: Values) => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({visible,onCreate,onCancel}) => {
    const [catIngredients, setCatIngredients] = useState<Array<IngredientCat>>([]);
    const [units, setUnits] = useState<Array<Unit>>([]);
    const [catAllergens, setCatAllergens] = useState<Array<AllergenCat>>([]);
    useEffect(() => {
        CatIngredientService.getAllCatIngredients()
            .then((response: any) => {
                setCatIngredients(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        UnitService.getAllUnits()
            .then((response: any) => {
                setUnits(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        AllergenCatService.getAllAllergenCat()
            .then((response: any) => {
                setCatAllergens(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });

    }, []);

    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Création d'un nouvel ingrédient"
            okText="Créer"
            cancelText="Annuler"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ stock:0, prixunitaireingredient :0}}
            >
                <Form.Item
                    name="nomingredient"
                    label="Nom de l'ingrédient"
                    rules={[{ required: true, message: "Il faut entrer le nom de l'ingrédient" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="idcategorieingredient"
                    label="Catégorie de l'ingrédient"
                    rules={[{ required: true, message: "Il faut sélectionner une catégorie d'ingrédient" }]}
                >
                    <Select placeholder="Catégorie de l'ingrédient">
                        {catIngredients.map((item :IngredientCat) => <Select.Option key={item.idcategorieingredient} value={item.idcategorieingredient}>{item.nomcategorieingredient}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="idcategorieallergene"
                    label="Catégorie de l'allergène"
                    rules={[{ required: false, message: "Il faut sélectionner une catégorie d'allergène" }]}
                >
                    <Select placeholder="Catégorie de l'allergène">
                        {catAllergens.map((item :AllergenCat) => <Select.Option key={item.idcategorieallergene} value={item.idcategorieallergene}>{item.categorieallergene}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="idunite"
                    label="Unité"
                    rules={[{ required: true, message: "Il faut sélectionner une unité" }]}
                >
                    <Select placeholder="Unité">
                        {units.map((item :Unit) => <Select.Option key={item.idunite} value={item.idunite}>{item.nomunite}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="prixunitaireingredient" label="Prix unitaire de l'ingrédient" rules={[{required: true, message: "Il faut entrer le prix unitaire de l'ingrédient"}]}>
                    <InputNumber
                        min={0}
                        max={500}
                        step={0.25}
                        controls={true}
                        addonAfter={"€"}
                    />
                </Form.Item>
                <Form.Item name="stock" label="Stock initial" rules={[{required: true, message: "Il faut entrer le stock initial"}]}>
                    <InputNumber
                        min={0}
                        max={50000}
                        step={0.5}
                        controls={true}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
};

const IngredientCreationForm : React.FC<IngredientFormProps> = ({onCreateForm}) => {
    const [visible, setVisible] = useState(false);

    const onCreate = (values: any) => {
        onCreateForm(values);
        setVisible(false);
    };

    return (

        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Créer un nouvel ingrédient
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};
export default IngredientCreationForm;