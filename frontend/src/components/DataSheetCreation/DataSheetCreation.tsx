import { Steps, Button, message } from 'antd';
import React, {useState} from 'react'
import CostManagement from './CostManagement'
import  StepCreation from './StepCreation'
import GeneralInfoDatasheet from './GeneralInfoDatasheet'
import Datasheet from "../../types/Datasheet";
import StepT from "../../types/Step"
const { Step } = Steps;
//TODO enlever bouton suivant factice
interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}
interface DatasheetProps {
    onChange: (fields: FieldData[]) => void;
    onFinish: () => void;
    fields: FieldData[];
}


const submit= () => {
    message.success('Processing complete!')

}



const DataSheetCreaction = () => {
    const onFinishGeneralInfo= (values: any) => {
        message.success('Submit General info')
        console.log('Submit General inf',values)
        next()

    }
    const onFinishSteps= (values: any) => {
        message.success('Submit steps')
        console.log('Submit steps',values)
        next()
    }
    const onFinishCost= (values: any) => {
        console.log('submit cost',values)
        submit()
    }
    const [fieldsGeneralInfo, setFieldsGeneralInfo] = useState<FieldData[]>([]);
    const [fieldsCostManagement, setFieldsCostManagement] = useState<FieldData[]>([]);
    const [fieldsStepCreation, setFieldsStepCreation] = useState<FieldData[]>([]);
    const steps = [
        {
            title: 'Informations générales',
            content: <GeneralInfoDatasheet fields={fieldsGeneralInfo} onChange={(newFields : FieldData[]) => {
                setFieldsGeneralInfo(newFields)
                console.log("generalinfo",newFields)}} onFinish={onFinishGeneralInfo}></GeneralInfoDatasheet>,
            isValidated : false,
            auteur : null,
            fichetechnique: null
        },
        {
            title: 'Progression',
            content: <StepCreation fields={fieldsStepCreation} onChange={(newFields : FieldData[]) => {
                setFieldsStepCreation(newFields)
                console.log("step",newFields)}} onFinish={onFinishSteps}></StepCreation>,
            isValidated : false,
            etape : null,
            fichetechniquejointure : null
        },
        {
            title: 'Coût',
            content: <CostManagement fields={fieldsCostManagement} onChange={(newFields : FieldData[]) => {
                setFieldsCostManagement(newFields)
                console.log("cost",newFields)}} onFinish={onFinishCost}></CostManagement>,
            isValidated : false,
            cost : null
        },
    ];


    const [current, setCurrent] = React.useState(0);
    const onGeneralInfoFinish = () => {
        next();
        console.log(fieldsGeneralInfo)
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>

            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Précédent
                    </Button>
                )}
                <Button style={{ margin: '0 8px' }} onClick={() => next()}>
                    Précédentsss
                </Button>
            </div>
        </>
    );
};

export default DataSheetCreaction