import { Steps, Button, message } from 'antd';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import CostManagement from './CostManagement'
import  StepCreation from './StepCreation'
import GeneralInfoDatasheet from './GeneralInfoDatasheet'
import Datasheet from "../../types/Datasheet";
import StepT from "../../types/Step"
import DataSheetService from "../../services/DataSheetService";
import StepService from "../../services/StepService";
import StepIngredientJoinService from "../../services/StepIngredientJoinService";
import CostService from "../../services/CostService";
import Cost from "../../types/Cost";
import CostData from "../../types/Cost";
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
    idauteur: number
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

//This function uses the data from all the forms and creates the datasheet in the database by calling the according services.
const submit= async () => {
    message.loading("Création de la fiche technique...")
    //Datasheet object
    let datasheet: Datasheet = {
        idfichetechnique: -1,
        idcategoriefichetechnique: generalInfo.idcategoriefichetechnique,
        idauteur: generalInfo.idauteur,
        nomplat: generalInfo.nomplat,
        nombrecouverts: generalInfo.nombrecouverts,
        image: '',
        nomauteur: ""
    }

    //gets the id of the datasheet created
    let idDatasheetPromise;
    idDatasheetPromise = await DataSheetService.create(datasheet).then((value => { // @ts-ignore

       return value.result.rows[0].idfichetechnique
    })).catch(e => console.log(e))
    console.log("j'ai l'id datasheet",idDatasheetPromise)
    let stepsBD : Array<StepT> = []
    let stepsID : Array<number> = []
    let currentStep : StepsFromForm;
    let ingredients : [{idingredient : number, quantite : number}] = [{idingredient : -1, quantite : -1}];

    //STEPS : Creates the steps in the database

    for (let i = 0 ; i < stepForm.etapes.length; i++) {
        currentStep = stepForm.etapes[i];
        console.log("current step " + i, currentStep)
        stepsBD[i] = {
            idetape: -1,
            idfichetechnique: await idDatasheetPromise ,
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

        //Creates the ingredients in the database (using a join table)

        console.log("j'ai attendu etape", stepsID[i])
        try {
            for (let j = 0 ; j < stepForm.etapes[i].ingredients.length; j++) {
                try {
                    let currentIngredient = stepForm.etapes[i].ingredients[j]
                    ingredients[j] = {idingredient : currentIngredient.idingredient, quantite : currentIngredient.quantite}
                    let res = await StepIngredientJoinService.create({idfichetechnique : idDatasheetPromise,idetape : stepsID[i], idingredient : currentIngredient.idingredient, quantite : currentIngredient.quantite})
                        .then(value => console.log("ing",value)).catch(e => console.log(e))
                }catch (e) {
                    console.log(e)
                }

            }
        }catch(e){
            console.log("no ingredients in step" + i)
        }

    }
    //INCLUDED DATASHEETS : creates the included datasheets in the database by using a join table
    let includedDatasheetsIds : [number] = [0];//Used to compute cost
    try {
        for (let k = 0 ; k < stepForm.fichetechniquejointure.length; k++) {
            try {
                let currentDatasheetJoin : {fichetechnique : number, stepnumber : number} = stepForm.fichetechniquejointure[k];
                includedDatasheetsIds[k] = currentDatasheetJoin.fichetechnique
                let res = await DataSheetService.createJoin({idfichetechniquefille : currentDatasheetJoin.fichetechnique, idfichetechniqueparent : idDatasheetPromise, numetape : currentDatasheetJoin.stepnumber})
                    .then(value => console.log("join",value))
            }catch (e) {
                console.log(e)
            }
        }
    }catch (e) {
        console.log("no datasheet join")
    }


    //COST : fills the cost table in the database
    let totalMinutes : number = await StepService.getGlobalTimeToMakeDataSheet(idDatasheetPromise).then((value => parseInt(value.tempsetape)))
    let chargesCost : number = await CostService.getChargesCost(costForm.salarycost, costForm.fluidcost, totalMinutes);
    let ingredientCost : number = await CostService.getIngredientsCost(ingredients);
    let materialCost : number =  CostService.getMaterialsCost(ingredientCost, costForm.seasoning)

    //Gets the cost from the included datasheets
    let includeddatasheetscost: Array<CostData> = await CostService.getCostForSeveralDataSheet(includedDatasheetsIds);
    console.log("cost incl" ,includeddatasheetscost)
    let cost : Cost = {
        idCost: 0,
        idfichetechnique: idDatasheetPromise,
        chargescalculated: costForm.chargescalculated,
        chargescost: chargesCost,
        materialscost: materialCost,
        coefwithcharges: costForm.coefwithcharges,
        coefwithoutcharges: costForm.coefwithoutcharges,
        includeddatasheetscost: 0
    }

    // @ts-ignore
    const costCreated : any= await CostService.createWithOtherDatasheetsCosts(cost,includeddatasheetscost)
        .then(value => console.log("cost",value))
        .catch((e) => {console.log("cost FAIL",e)})
    message.success('Fiche technique créée!')
    return  Promise.resolve(idDatasheetPromise)
}


//This component is composed of the 3 datasheets form and allows a step by step navigation
const DataSheetCreation = () => {
    let navigate = useNavigate();
    const onFinishGeneralInfo= (values: GeneralInfo) => {
        generalInfo = values;
        next()

    }
    const onFinishSteps= (values: StepForm) => {
        stepForm = values
        if (stepForm.etapes.length <= 0) {
            message.error("Il faut au moins une étape dans la Fiche Technique")
        }else {
            next()
        }

    }
    const onFinishCost= async (values: CostForm) => {
        costForm = values
        submit().then((value)=> {navigate("/fichetechnique"+ "/" +value)})
    }
    const [fieldsGeneralInfo, setFieldsGeneralInfo] = useState<FieldData[]>([]);
    const [fieldsCostManagement, setFieldsCostManagement] = useState<FieldData[]>([]);
    const [fieldsStepCreation, setFieldsStepCreation] = useState<FieldData[]>([]);
    const steps = [
        {
            title: 'Informations générales',
            content: <GeneralInfoDatasheet fields={fieldsGeneralInfo} onChange={(newFields : FieldData[]) => {
                setFieldsGeneralInfo(newFields)
                }} onFinish={onFinishGeneralInfo}/>,
            isValidated : false,
            auteur : null,
            fichetechnique: null
        },
        {
            title: 'Progression',
            content: <StepCreation fields={fieldsStepCreation} onChange={(newFields : FieldData[]) => {
                setFieldsStepCreation(newFields)
                }} onFinish={onFinishSteps}/>,
            isValidated : false,
            etape : null,
            fichetechniquejointure : null
        },
        {
            title: 'Coût',
            content: <CostManagement fields={fieldsCostManagement} onChange={(newFields : FieldData[]) => {
                setFieldsCostManagement(newFields)
               }} onFinish={onFinishCost}/>,
            isValidated : false,
            cost : null
        },
    ];


    const [current, setCurrent] = React.useState(0);

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
            </div>
        </>
    );
};

export default DataSheetCreation