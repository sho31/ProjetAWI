import React, {useState, useEffect, useRef, Fragment} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import {Button, Card, Image} from "antd";
import RealizationCall from "./Realization/RealizationCall";
import Synthesis from "./Synthesis/Synthesis";
import ReactToPrint from "react-to-print";

interface Props {
    id: number;
}

const HeaderDataSheet: React.FC<Props> = (props: Props) => {
    const [dataSheet, setdataSheet] = useState<DatasheetData>();
    const componentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const retrieveTutorials = async (id : number) => {
            await DataSheetService.getDataSheetByID(id)
                .then((response: any) => {
                    setdataSheet(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };

        retrieveTutorials(props.id).then(r => "ok");
    }, [props.id]);

    const addSale =  (saleNumber : number) => {
        console.log("Incrémenter ", saleNumber, " ventes")
    }

    return (
        <>
            { dataSheet &&
                <Fragment>
                    <div key={1} ref={componentRef}>
                        <Card title={dataSheet.nomplat} bordered={false} key={2}>
                            <Image
                                width={200}
                                src={dataSheet.image}
                                alt={"burger"}
                            />
                            <p>Nombre de couverts : {dataSheet.nombrecouverts}
                                <br/>
                                par {dataSheet.nomauteur}</p>
                        </Card>
                        <br></br>
                        <RealizationCall id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts}/>
                        <br></br>
                        <Synthesis id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts}></Synthesis>
                        <br></br>
                    </div>
                    <div key={2}>
                        <ReactToPrint
                            trigger={() => <Button color="primary" onClick={() => addSale(dataSheet.nombrecouverts)}>Imprimer la fiche technique</Button>}
                            content={() => componentRef.current}
                        />
                    </div>
                </Fragment>
        }


        </>
    );
};

export default HeaderDataSheet;
