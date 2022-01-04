import React, {Fragment, useEffect, useState} from 'react';
import {Form, Input, Select, InputNumber, Button, Space, Card, Divider, message} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import SimpleIngredient from "../../types/SimpleIngredient";
import ingredientService from "../../services/IngredientService";
import Datasheet from "../../types/Datasheet";
import DatasheetService from "../../services/DataSheetService";
import {Link} from "react-router-dom";
import UnitService from "../../services/UnitService";
import Ingredient from "../../types/Ingredient";
import Unit from "../../types/Unit";
import IngredientService from "../../services/IngredientService";
import IngredientCreationForm from "../Mercurial/IngredientCreationForm";
import StepService from "../../services/StepService";

const { TextArea } = Input;


// @ts-ignore
// @ts-ignore
const StepCreation: React.FC<DatasheetProps> = ({onChange, fields, onFinish}) => {
    let arrayUnits : Array<Array<String>> = new Array<Array<String>>(30)
    let units : Array<String> = new Array(30)
    units.fill("void")
    arrayUnits.fill(units)
    const [form] = Form.useForm()
    const fieldss = fields;
    const [ingredients, setIngredients] = useState<Array<SimpleIngredient>>([]);
    const [datasheets, setDatasheets] = useState<Array<Datasheet>>([]);
    const [unit, setUnit] = useState<Array<Array<String>>>(arrayUnits);
    const [dom, setDom] = useState<Array<Boolean>>(new Array(10))
    useEffect(
        ()=> {
            //refresh the page
            console.log("refresh")
        }
    ,dom)

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
    //The following form is an AntDesign Form Component, using imbricated forms (Form.List), we get Arrays for each form list containing the values of the form.
    //Each form list manages an array of Fields, add contains callback methods add and remove that we can assign to buttons
    //Each array of fields is then map to fields component.
    //The values are then easily accesible on submit.
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
                    onChange(allFields);
                }}
                onFinish={(values) => {
                    if(StepService.verifyStepOrder(values)) {
                        onFinish(values);
                    }else {
                        message.error("Vérifier que les numéros d'étape se suivent et ne sont pas égaux")
                    }
                }}

            >

                <Form.List name="etapes">

                    {(fields, {add, remove}) => (
                        <>
                            {fields.map(({key, name, fieldKey}) => {

                                const currentStep = fieldKey
                                return (
                                        <Card key={key} title={"Étape"}
                                              extra={<MinusCircleOutlined onClick={() => {
                                                  if(name ===0) {
                                                      message.info("Chaque fiche technique doit posséder au moins une étape")
                                                  }else {
                                                      remove(name)
                                                      onChange(fieldss);
                                                  }
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

                                            <p>Un ingrédient ne figure pas dans la liste ? Cliquez ci-dessous pour ajouter un ingrédient</p>
                                            <IngredientCreationForm onCreateForm={async (values) => {
                                                let arr = [...dom]
                                                arr[0] = true
                                                setDom(arr)
                                                const ing: Ingredient = {
                                                    idingredient: -1,
                                                    idcategorieingredient: values.idcategorieingredient,
                                                    idcategorieallergene: values.idcategorieallergene,
                                                    idunite: values.idunite,
                                                    nomunite: -1,
                                                    nomingredient: values.nomingredient,
                                                    prixunitaireingredient: values.prixunitaireingredient,
                                                    stock: values.stock
                                                }
                                                await IngredientService.create(ing)
                                                ingredientService.getAllIngredients()
                                                    .then((response: any) => {
                                                        setIngredients(response);
                                                    })
                                                    .catch((e: Error) => {
                                                        console.log(e);
                                                    });
                                            }}/>
                                            <br/>
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

                                                                            }

                                                                    onSelect={(async value => {
                                                                        console.log("field " + fieldKey, "val " + value, currentStep)
                                                                        let unit: Unit = await IngredientService.getUnitFromIngredientID(value).then(value => {
                                                                            return value
                                                                        }).catch(e => {console.log(e); return {idunite:1, nomunite :"kg"}})
                                                                        setUnit((prevState => {
                                                                            prevState[currentStep][fieldKey] = unit.nomunite
                                                                            return prevState
                                                                        }))
                                                                        let arr = [...dom]
                                                                        arr[0] =true
                                                                        setDom(arr)

                                                                    })}
                                                                    >
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
                                                                        max={1000}
                                                                        addonAfter={unit[currentStep][fieldKey] === "void" ? "" : unit[currentStep][fieldKey]}
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