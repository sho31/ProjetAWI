import React, {useState, useEffect, useRef, Fragment} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import {Button, Card, Image} from "antd";
import RealizationCall from "./Realization/RealizationCall";
import Synthesis from "./Synthesis/Synthesis";
import ReactToPrint from "react-to-print";
import ButtonGroup from "antd/es/button/button-group";
import "../../tailwind.css";
import { MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { useParams } from "react-router-dom";



let initDataSheet = new DatasheetData(0,0,0,"","",0,"");

const HeaderDataSheet: React.FC = () => {
    const props = useParams();
    const [dataSheet, setdataSheet] = useState<DatasheetData>(initDataSheet);
    const componentRef = useRef<HTMLDivElement>(null);
    const [theoricalNbCouverts,setTheoricalNbCouverts] = useState<number>(initDataSheet.nombrecouverts);

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

    const addSale =  (saleNumber : number) => {
        console.log("Incrémenter ", saleNumber, " ventes")
    }

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

    if(dataSheet.idfichetechnique !==0){ // Si on a récupérer une fiche technique
        return (
                <Fragment>
                    <div key={1} ref={componentRef}>
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
                        <Synthesis id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts} theoricalNbCouverts={theoricalNbCouverts}></Synthesis>
                        <br></br>
                    </div>
                    <div key={2}>
                        <ReactToPrint
                            trigger={() => <Button color="primary" onClick={() => addSale(dataSheet.nombrecouverts)}>Imprimer la fiche technique</Button>}
                            content={() => componentRef.current}
                        />
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
