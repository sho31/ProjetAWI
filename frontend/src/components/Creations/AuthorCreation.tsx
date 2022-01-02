import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, message, Modal, Popconfirm, Space, Table} from 'antd';

import Author from "../../types/Author";
import AuthorService from "../../services/AuthorService";

const { Column } = Table;

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
                    name="lastname"
                    label="Nom"
                    rules={[{ required: true, message: 'Entrez un nom' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="firstname"
                    label="Prénom"
                    rules={[{ required: true, message: 'Entrez un prénom' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const AuthorCreation = () => {
    const [visible, setVisible] = useState(false);
    const [authors, setAuthors] = useState<Array<Author>>([]);
    const [update,setUpdate] = useState<boolean>(false);

    useEffect(() => {
        const getCatIngredients = async () => {
            await AuthorService.getAllAuthors()
                .then((response: any) => {
                    setAuthors(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        getCatIngredients().then(() => "ok");
        setUpdate(false);
    }, [update]);


    const onCreate = async (values: any) => {
        let author = new Author(-1,values.lastname,values.firstname)
        await createAuthor(author);
        setVisible(false);
        setUpdate(true);
    };

    const createAuthor = async (data: Author) => {
        await AuthorService.create(data)
            .then((response: any) => {
                message.success(response.message);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const deleteAuthor = async (id: number) => {
        await AuthorService.remove(id)
            .then((response: any) => {
                message.success(response.message)
                setUpdate(true);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    const confirm = async (id: number) => {
        await deleteAuthor(id)
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
                <Table dataSource={authors}  pagination={false} rowKey={"idauteur"} >
                    <Column title="Nom" dataIndex="nomauteur" key={1} responsive={["xs","sm","md","lg"]} />
                    <Column title="Prénom" dataIndex="prenomauteur" key={1} responsive={["xs","sm","md","lg"]} />
                    <Column
                        title="Action"
                        key={5}
                        responsive={["xs","sm","md","lg"]}
                        render={(author) => (
                            <Space size="middle" key={author.idauteur} >
                                <Popconfirm title="Etes vous sur de vouloir supprimer cet author ？" onConfirm={() => confirm(author.idauteur)} onCancel={() => cancel()} key={author.idauteur}>
                                    <a href="/" key={author.idauteur}>
                                        <Button type="primary" danger key={author.idauteur}>
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

export default AuthorCreation;