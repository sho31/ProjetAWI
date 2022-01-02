import React, {Fragment, useEffect, useState} from 'react';
import {Form, Input, Select, InputNumber, Button, Space, Card, Divider} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import SimpleIngredient from "../../types/SimpleIngredient";
import ingredientService from "../../services/IngredientService";
import Datasheet from "../../types/Datasheet";
import DatasheetService from "../../services/DataSheetService";
import {Link} from "react-router-dom";

const { TextArea } = Input;


// @ts-ignore
// @ts-ignore
const StepCreation: React.FC<DatasheetProps> = ({onChange, fields, onFinish}) => {
    //TODO Controller qu'une ft jointure n'a pas le mm numéro d'étape qu'une etape
    const [form] = Form.useForm()
    const fieldss = fields;
    const [ingredients, setIngredients] = useState<Array<SimpleIngredient>>([]);
    const [datasheets, setDatasheets] = useState<Array<Datasheet>>([]);

    useEffect( () => {
        ingredientService.getAllIngredients()
            .then((response: any) => {
                setIngredients(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
        DatasheetService.getAllDataSheets()
            .then((response: any) => {
                setDatasheets(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }, []);
    return(
        <>
            <h2>Création de la progression</h2>
            <Form
                form={form}
                name="steps"
                layout="vertical"
                size="large"
                fields={fields}
                initialValues={{ etapes:[{descriptionetape : "",ingredients: [null],numetape: null,tempsetape: null,titreetape: null}]}}
                onFieldsChange={(_, allFields) => {
                    //console.log("fieeeelds", fieldss)
                    onChange(allFields);
                }}
                onFinish={(values) => {
                    onFinish(values);
                }}

            >

                <Form.List name="etapes">

                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, fieldKey}) => {


                                return (
                                        <Card key={key} title={"Étape"}
                                              extra={<MinusCircleOutlined onClick={() => {
                                                  remove(name)
                                                  //console.log("test",fieldss)
                                                  onChange(fieldss);
                                              }}
                                              />}
                                              style={{width: '100%', margin:8}}>
                                        <Space key={key} wrap size={'large'} style={{ display: 'flex', marginBottom: 8, width : "100%"}}
                                               align="baseline">

                                            <Form.Item
                                                name={[name, 'numetape']}
                                                fieldKey={[fieldKey, 'numetape']}
                                                rules={[{required: true, message: "Il manque le numéro de l'étape"}]}
                                                label="Numéro de l'étape"

                                            >
                                                <InputNumber
                                                    min={1}
                                                    max={100}/>
                                            </Form.Item>
                                            <Form.Item
                                                name={[name, 'titreetape']}
                                                fieldKey={[fieldKey, 'titreetape']}
                                                rules={[{required: true, message: "Il manque le titre de l'étape"}]}
                                                label="Titre de l'étape"
                                            >
                                                <Input/>
                                            </Form.Item>
                                            <Form.Item
                                                name={[name, 'tempsetape']}
                                                fieldKey={[fieldKey, 'tempsetape']}
                                                rules={[{required: true, message: "Il manque la durée de l'étape"}]}
                                                label="Durée de l'étape"

                                            >
                                                <InputNumber addonAfter="minutes"
                                                             min={0}
                                                             max={100} />
                                            </Form.Item>



                                            <Form.Item
                                                name={[name, 'descriptionetape']}
                                                fieldKey={[fieldKey, 'descriptionetape']}
                                                rules={[{required: true, message: "Il manque la description de l'étape"}]}
                                                label="Description de l'étape"
                                                style={{ width : "35vw"}}
                                            >
                                                <TextArea rows={2}/>
                                            </Form.Item>
                                        </Space>

                                            <Link to='/mercurial'><a>Un ingrédient ne figure pas dans la liste ? Cliquez pour accéder à la création d'ingrédient</a></Link>
                                            <Form.List name={[fieldKey, "ingredients"]}>
                                                {(fields, { add, remove }) => (
                                                    <>
                                                        {fields.map(({ key, name, fieldKey }) => (
                                                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="center">
                                                                <Form.Item
                                                                    name={[name, 'idingredient']}
                                                                    fieldKey={[fieldKey, 'idingredient']}
                                                                    rules={[{ required: true, message: 'Il faut choisir un ingrédient' }]}
                                                                >
                                                                    <Select placeholder="Ingrédient"
                                                                            showSearch
                                                                            optionFilterProp="children"
                                                                            filterOption={(input, option) => {
                                                                                if (option !== undefined) {
                                                                                    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                }else {
                                                                                    return false
                                                                                }

                                                                            }

                                                                            }>
                                                                        {ingredients.map((item :SimpleIngredient) => <Select.Option key={item.idingredient} value={item.idingredient}>{item.nomingredient}</Select.Option>)}
                                                                    </Select>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    name={[name, 'quantite']}
                                                                    fieldKey={[fieldKey, 'quantite']}
                                                                    rules={[{ required: true, message: 'Il faut choisir une quantité' }]}
                                                                >
                                                                    <InputNumber
                                                                        min={0}
                                                                        max={100}
                                                                    />
                                                                </Form.Item>
                                                                <MinusCircleOutlined onClick={() => {
                                                                    remove(name)
                                                                    //console.log("test",fieldss)
                                                                    onChange(fieldss);
                                                                }}/>
                                                            </Space>
                                                        ))}
                                                        <Form.Item>
                                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                                Ajouter un ingrédient
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Card>

                                    )
                                }
                            )}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Ajouter une étape
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Divider />
                <h2>Fiches techniques incluses dans la progression</h2>
                <Divider />
                <Form.List name="fichetechniquejointure">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey }) => (
                                <Space key={key} size={"large"}  >
                                <Card extra={ <MinusCircleOutlined onClick={() => {
                                    remove(name)
                                    onChange(fieldss);
                                }}/>}
                                      style={{width:'19vw',margin:8}}
                                    >
                                    <Form.Item
                                        name={[name, 'fichetechnique']}
                                        fieldKey={[fieldKey, 'fichetechnique']}
                                        rules={[{ required: true, message: 'Il faut choisir une fiche technique!' }]}
                                        label={"Fiche Technique à inclure"}
                                    >
                                        <Select placeholder="Fiche Technique"
                                                showSearch
                                                optionFilterProp="children"
                                                filterOption={(input, option) => {
                                                    if (option !== undefined) {
                                                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }else {
                                                        return false
                                                    }

                                                }

                                                }>
                                            {datasheets.map((item :Datasheet) => <Select.Option key = {item.idfichetechnique} value={item.idfichetechnique}>{item.nomplat}</Select.Option>)}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'stepnumber']}
                                        fieldKey={[fieldKey, 'last']}
                                        rules={[{ required: true, message: "Il faut choisir un numéro d'étape" }]}
                                        label={"Numéro d'étape"}
                                    >
                                        <InputNumber
                                            min={1}
                                            max={100}

                                        />
                                    </Form.Item>

                                </Card>
                                </Space>

                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Ajouter une fiche technique à inclure
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}




export default StepCreation