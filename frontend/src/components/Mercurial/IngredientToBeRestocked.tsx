import React, {useState, useEffect, Fragment} from "react";
import IngredientService from "../../services/IngredientService";
import ITutorialData from '../../types/Ingredient';
import {Space, Table, Button, Badge, InputNumber} from "antd";

interface Props {
    dom: any;
    updateDom: any;
}

const IngredientsList: React.FC<Props>= (props) => {
    const [ingredients, setIngredients] = useState<Array<ITutorialData>>([]);
    const { Column } = Table;
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        const retrieveIngredients = async () => {
            await IngredientService.getAllIngredientsWithNegativeStock()
                .then((response: any) => {
                    setIngredients(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        retrieveIngredients().then( () => "ok");
    }, [props.dom]);

    const addStock = async (id:number,newStock: number) => {
        await IngredientService.addStock(id,newStock)
            .then((response: any) => {
                props.updateDom(props.dom+1)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    if(ingredients.length>0){
        return (
            <Fragment key={1}>
                <Badge count={ingredients.length}>
                    <h3 key={3}>
                        Ingrédients à réapprovisionner
                    </h3>
                </Badge>
                <Table dataSource={ingredients}  pagination={false} rowKey={"idingredient"} >
                    <Column title="Nom ingrédient" dataIndex="nomingredient" key={1} responsive={["xs","sm","md","lg"]} />
                    <Column title="Quantité" dataIndex="stock" key={3} responsive={["xs","sm","md","lg"]} />
                    <Column title="Unité" dataIndex="nomunite" key={4} responsive={["xs","sm","md","lg"]} />
                    <Column
                        title="Action"
                        key={4}
                        responsive={["xs","sm","md","lg"]}
                        render={(ingredient,index) => (
                            <Fragment>
                                <Space size="middle" key={ingredient.idingredient} >
                                    <InputNumber min={0} max={10} defaultValue={0} onChange={(id:number) => {setValue(id)}}  style={{width:50}}/>
                                </Space>
                                <Space size="middle" key={ingredient.idingredient+1} >
                                    <Button
                                    type="primary"
                                    onClick={() => {
                                        addStock(ingredient.idingredient,value)}}
                                    >
                                    Ajouter
                                    </Button>
                                </Space>
                            </Fragment>
                        )}
                    />
                </Table>
            </Fragment>
        );
    }
    return (
        <Fragment>
            <h3 key={3}>
                Ingrédients à réapprovisionner
            </h3>
            <p>Tous les ingrédients ont un stock suffisant</p>
        </Fragment>
    );
};

export default IngredientsList;

