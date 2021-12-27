import React, {useState, useEffect, useRef, Fragment} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import {Button, Card, Image, Popconfirm,message} from "antd";
import RealizationCall from "./Realization/RealizationCall";
import Synthesis from "./Synthesis/Synthesis";
import ReactToPrint from "react-to-print";
import ButtonGroup from "antd/es/button/button-group";
import "../../tailwind.css";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { useParams } from "react-router-dom";
import TakeAwayCall from "./TakeAwayLabel/TakeAwayCall";



let initDataSheet = new DatasheetData(0,0,0,"","",0,"");

const HeaderDataSheet: React.FC = () => {
    const props = useParams();
    const [dataSheet, setdataSheet] = useState<DatasheetData>(initDataSheet);
    const dataSheetRef = useRef<HTMLDivElement>(null);
    const takeAwayLabel = useRef<HTMLDivElement>(null);
    const [theoricalNbCouverts,setTheoricalNbCouverts] = useState<number>(initDataSheet.nombrecouverts);
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [decrementStock, setDecrementStock] = React.useState(false);

    useEffect(() => {
        const retrieveTutorials = async (id : any) => {
            await DataSheetService.getDataSheetByID(id)
                .then((response: any) => {
                    setdataSheet(response);
                    setTheoricalNbCouverts(response.nombrecouverts);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        retrieveTutorials(props.id).then( () => "ok");
    }, [props.id]);

    const increaseBadge = () => {
        /* On fixe la quantité max à 100 couverts*/
        if(theoricalNbCouverts < 100){
            setTheoricalNbCouverts(theoricalNbCouverts+1);
        }
    };

    const declineBadge = () => {
        /* On fixe la quantité max à 100 couverts*/
        if(theoricalNbCouverts > 1){
            setTheoricalNbCouverts(theoricalNbCouverts-1);
        }
    };

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const openMessage = (theoricalNbCouverts: number) => {
        setDecrementStock(true);
        message.loading({ content: 'Enregistrement des ventes', duration: 1 });
        setTimeout(() => {
            message.success({ content: 'Vous avez vendu ' +theoricalNbCouverts+ ' plats', duration: 5 });
        }, 1000);
    };

    if(dataSheet.idfichetechnique !==0){ // Si on a récupérer une fiche technique
        return (
                <Fragment >
                    <div key={1} ref={dataSheetRef} >
                        <Card title="En-tête" bordered={false} key={2}>
                            <h1 className="text-right">{dataSheet.nomplat}</h1>
                            <Image
                                width={200}
                                src={dataSheet.image}
                                alt={"burger"}
                            />
                            <div>Nombre de couverts :
                                <ButtonGroup>
                                    <Button onClick={declineBadge}>
                                        <MinusOutlined />
                                    </Button>
                                    <h1>{theoricalNbCouverts}</h1>
                                    <Button onClick={increaseBadge}>
                                        <PlusOutlined />
                                    </Button>
                                </ButtonGroup>
                                <br/>
                                par {dataSheet.nomauteur}
                            </div>
                        </Card>
                        <br></br>
                        <RealizationCall id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts} theoricalNbCouverts={theoricalNbCouverts}/>
                        <br></br>
                        <Synthesis id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts} theoricalNbCouverts={theoricalNbCouverts} decrementStock={decrementStock}></Synthesis>
                        <br></br>
                    </div>
                    <div key={2}>
                        <ReactToPrint
                            trigger={() => <Button color="primary">Imprimer la fiche technique</Button>}
                            content={() => dataSheetRef.current}
                        />
                        <ReactToPrint
                            trigger={() => <Button color="primary">Imprimer l'étiquette à emporter</Button>}
                            content={() => takeAwayLabel.current}
                        />
                        <Popconfirm
                            title="Title"
                            visible={visible}
                            onConfirm={handleOk}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={handleCancel}
                        >
                            <Button type="primary" onClick={ () => openMessage(theoricalNbCouverts)}>
                                Valider les ventes pour {theoricalNbCouverts} couverts
                            </Button>
                        </Popconfirm>
                    </div>
                    <div key={3} hidden>
                        <div key={4} ref={takeAwayLabel}>
                            <TakeAwayCall id={dataSheet.idfichetechnique}/>
                        </div>
                    </div>
                </Fragment>
        );
    }
    else{
        return( // Dans le cas où l'on a aucune fiche technique on affiche quand même quelque chose
            <></>
        );
    }
};

export default HeaderDataSheet;
