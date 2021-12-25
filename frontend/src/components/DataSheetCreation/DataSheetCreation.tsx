import { Steps, Button, message } from 'antd';
import React, {useState} from 'react'
import CostManagement from './CostManagement'
import  StepCreation from './StepCreation'
import GeneralInfoDatasheet from './GeneralInfoDatasheet'
import Datasheet from "../../types/Datasheet";
import StepT from "../../types/Step"
import DataSheetService from "../../services/DataSheetService";
import StepService from "../../services/StepService";
import StepIngredientJoinService from "../../services/StepIngredientJoinService";
const { Step } = Steps;
//TODO enlever bouton suivant factice
//TODO ENLEVER CONSOLES LOG

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

interface GeneralInfo {
    idcategoriefichetechnique: number
    nombrecouverts : number
    nomauteur: string
    nomplat: string
    upload: any //TODO enlever any
}
interface StepsFromForm {
    descriptionetape : string
    numetape: number
    tempsetape : number
    titreetape : string
    ingredients : [{idingredient : number, quantite : number}]
}
interface StepForm {
    etapes : Array<StepsFromForm>
    fichetechniquejointure : [{fichetechnique : number, stepnumber : number}]
}
interface CostForm {
    chargescalculated : boolean
    coefwithcharges : number
    coefwithoutcharges : number
    fluidcost : number
    salarycost : number
    seasoning : number

}
let generalInfo :GeneralInfo;
let stepForm : StepForm;
let costForm : CostForm;

const submit= async () => {
    message.success('Processing complete!')
    //Datasheet object
    let datasheet: Datasheet = {
        idfichetechnique: -1,
        idcategoriefichetechnique: generalInfo.idcategoriefichetechnique,
        idauteur: 1,
        nomplat: generalInfo.nomplat,
        nombrecouverts: generalInfo.nombrecouverts,
        image: '',
        nomauteur: "michel"
    }
    //console.log(datasheet)
    let idDatasheet;
    idDatasheet = await DataSheetService.create(datasheet).then((value => { // @ts-ignore
        //console.log("val", value.result.rows[0].idfichetechnique)
        // @ts-ignore
        return value.result.rows[0].idfichetechnique
    })).catch(e => console.log(e))
    console.log("id", idDatasheet)
    let stepsBD : Array<StepT> = []
    let stepsID : Array<number> = []
    let currentStep : StepsFromForm;

    //STEPS
    console.log(stepForm)
    for (let i = 0 ; i < stepForm.etapes.length; i++) {
        currentStep = stepForm.etapes[i];
        console.log("current step " + i, currentStep)
        stepsBD[i] = {
            idetape: -1,
            idfichetechnique: idDatasheet ,
            titreetape: currentStep.titreetape,
            descriptionetape: currentStep.descriptionetape,
            tempsetape: currentStep.tempsetape,
            numetape: currentStep.numetape
        }
        stepsID[i] = await StepService.create(stepsBD[i]).then((value => { // @ts-ignore
            console.log("val etape", value.result)
            // @ts-ignore
            return value.result.rows[0].idetape
        })).catch(e => console.log(e));
        //ingredients
        for (let j = 0 ; j < stepForm.etapes[i].ingredients.length; j++) {
            try {
                let currentIngredient = stepForm.etapes[i].ingredients[i]
                let res = await StepIngredientJoinService.create({idfichetechnique : idDatasheet,idetape : stepsID[i], idingredient : currentIngredient.idingredient, quantite : currentIngredient.quantite})
                    .then(value => console.log("ing",value)).catch(e => console.log(e))
            }catch (e) {
                console.log(e)
                console.log("join",stepForm.etapes[i].ingredients[i])
            }

        }
    }
    //datasheet join
    for (let k = 0 ; k < stepForm.etapes.length; k++) {
        try {
            console.log("joinn",stepForm.fichetechniquejointure[k])
            let currentDatasheetJoin : {fichetechnique : number, stepnumber : number} = stepForm.fichetechniquejointure[k];
            let res = await DataSheetService.createJoin({idfichetechniquefille : currentDatasheetJoin.fichetechnique, idfichetechniqueparent : idDatasheet, numetape : currentDatasheetJoin.stepnumber})
                .then(value => console.log("join",value))
        }catch (e) {
            console.log(e)
            console.log("join",stepForm.fichetechniquejointure[k])
        }


    }

}



const DataSheetCreation = () => {
    const onFinishGeneralInfo= (values: GeneralInfo) => {
        message.success('Submit General info')
        console.log('Submit General inf',values)
        generalInfo = values;
        next()

    }
    const onFinishSteps= (values: StepForm) => {
        message.success('Submit steps')
        console.log('Submit steps',values)
        stepForm = values
        next()
    }
    const onFinishCost= (values: CostForm) => {
        console.log('submit cost',values)
        costForm = values
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
                }} onFinish={onFinishGeneralInfo}></GeneralInfoDatasheet>,
            isValidated : false,
            auteur : null,
            fichetechnique: null
        },
        {
            title: 'Progression',
            content: <StepCreation fields={fieldsStepCreation} onChange={(newFields : FieldData[]) => {
                setFieldsStepCreation(newFields)
                }} onFinish={onFinishSteps}></StepCreation>,
            isValidated : false,
            etape : null,
            fichetechniquejointure : null
        },
        {
            title: 'Coût',
            content: <CostManagement fields={fieldsCostManagement} onChange={(newFields : FieldData[]) => {
                setFieldsCostManagement(newFields)
               }} onFinish={onFinishCost}></CostManagement>,
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

export default DataSheetCreation