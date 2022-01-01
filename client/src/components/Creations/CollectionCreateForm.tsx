import React from "react";
import {Form, Input, Modal} from "antd";

interface Values {
    title: string;
    description: string;
    modifier: string;
}

interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Values) => void;
    onCancel: () => void;
    nameCollection: string;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({visible, onCreate, onCancel,nameCollection}) => {
    const [form] = Form.useForm();
    const title = "Nouvelle catégorie d'"+nameCollection;
    return (
        <Modal
            visible={visible}
            title={title}
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
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="name"
                    label="Nom"
                    rules={[{ required: true, message: 'Entrez un nom de catégorie' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CollectionCreateForm;