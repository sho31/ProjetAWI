import React, { useState } from 'react';
import { Form, InputNumber, Button, Divider,Space, Radio } from 'antd';



// @ts-ignore
// @ts-ignore
const CostManagement: React.FC<DatasheetProps> = ({ onChange, fields, onFinish}) =>  {
    const [form] = Form.useForm()
    const [radioVal, setRadioVal] = useState(-1);
    const [radioVal2, setRadioVal2] = useState(0);
    const [radioValCost, setRadioValCost] = useState("a");
    const onRadioChange = (e : any)  => {
        setRadioVal(e.target.value);
    };
    const onRadioChangeCost = (e : any)  => {
        setRadioValCost(e.target.value);
    };

    return (
        <div>
            <h2>Paramètres de calcul du coût</h2>
            <h3>Entrez les paramètres de calcul du coût.</h3>
            <Form
                form = {form}
                name="cost_management"
                layout="vertical"
                size = "large"
                fields={fields}
                onFieldsChange={(_, allFields) => {
                    onChange(allFields);
                }}
                onFinish={(values) => {
                    onFinish(values);
                }}
                initialValues={ {coefwithcharges : 1, coefwithoutcharges : 1, salarycost : 0, fluidcost : 0}}

            >
                <h3>Matière</h3>
                <Form.Item name="seasoning" label="Coût de l’assaisonnement" rules={[{ required: true, message: "Il faut entrer le coût de l'assaisonnement" }]}>
                    <Radio.Group onChange={onRadioChange} >
                        <Space direction="vertical" >
                            <Radio value={-1}>5% du coût de la matière</Radio>
                            <Radio value={radioVal2}>
                                Montant fixe (en euros)
                                {(radioVal !== -1)  ? <InputNumber required={true} name={"seasoningFixe"} min={0}
                                                                   max={10000} style={{ width: 100, marginLeft: 10 }} onChange={((value : number) => {setRadioVal2(value)})} />  : null}
                            </Radio>
                        </Space>
                    </Radio.Group>
                </Form.Item>
                <Divider />
                <Form.Item name="chargescalculated" rules={[{ required: true, message: "Il faut choisir la méthode de calcul des coûts" }]}>
                <Radio.Group size="large" onChange={onRadioChangeCost}>
                    <Radio.Button value="true">Calculer le coût des fluides et de personnel</Radio.Button>
                    <Radio.Button value="false">Uniquement calculer le coût matière</Radio.Button>
                </Radio.Group>
                </Form.Item>
                {radioValCost === "true" ?
                    <><h3>Charges</h3>
                        <Form.Item name ="salarycost" label="Coût horaire moyen du personnel"  rules={[{required: true, message: "Il faut indiquer le coût horaire moyen du personnel"}]}>
                            <InputNumber addonAfter="€/h"
                                         min={0}
                                         max={10000}
                                         controls={true} />
                        </Form.Item>

                        <Form.Item name="fluidcost" label="Coût horaire forfaitaire des fluides"  rules={[{required: true, message: "Il faut indiquer le coût horaire forfaitaire des fluides"}]}>
                            <InputNumber
                                addonAfter="€/h"
                                min={0}
                                max={10000}
                                controls={true}
                            />
                        </Form.Item>

                        <h3>Prix de vente</h3>
                        <Form.Item name="coefwithcharges" label="Coefficient utilisé lorsqu’on a évalué le coût des fluides et du personnel" rules={[{required: true, message: "Entrer le coefficient"}]}>
                            <InputNumber
                                min={0}
                                max={50}
                                step={0.05}
                                controls={true}/>
                        </Form.Item></>
                    : radioValCost === "false"?
                        <>
                        <h3>Prix de vente</h3>
                        <Form.Item name="coefwithoutcharges" label="Coefficient utilisé lorsque l’on a pas évalué les charges" rules={[{required: true, message: "Entrer le coefficient"}]}>
                            <InputNumber
                                min={0}
                                max={50}
                                step={0.05}
                                controls={true}
                            />
                        </Form.Item>
                    </> :<></>

                }
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Soumettre la fiche technique
                    </Button>
                </Form.Item>


            </Form>
        </div>
    );
}







export default CostManagement