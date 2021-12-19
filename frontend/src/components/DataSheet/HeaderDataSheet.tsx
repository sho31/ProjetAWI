import React, {useState, useEffect} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import Img from '../../images/burger.jpg';
import {Card,Image} from "antd";
import RealizationCall from "./Realization/RealizationCall";
import Synthesis from "./Synthesis/Synthesis";

interface Props {
    id: number;
}

const HeaderDataSheet: React.FC<Props> = (props: Props) => {
    const [dataSheet, setdataSheet] = useState<DatasheetData>();

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

    return (
        <>
            { dataSheet &&
            <div key={1}>
                <Card title={dataSheet.nomplat} bordered={false} key={2}>
                    <Image
                        width={200}
                        src={Img}
                        alt={"burger"}
                    />
                    <p>Nombre de couverts : {dataSheet.nombrecouverts}</p>
                </Card>
                <br></br>
                <RealizationCall id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts}/>
                <br></br>
                <Synthesis id={dataSheet.idfichetechnique} nbCouverts={dataSheet.nombrecouverts}></Synthesis>
            </div>
        }
        </>
    );
};

export default HeaderDataSheet;
