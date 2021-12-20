import React, {useState, useEffect} from "react";

import DataSheetService from "../../../services/DataSheetService";

interface Props {
    id: number;
}

const NameDataSheet: React.FC<Props> = (props) => {

    const [dataSheetName, setDataSheetName] = useState<string>();

    useEffect( () => {
        const getDataSheetName = async (id: number) => {
            await DataSheetService.getDataSheetByID(id)
                .then((response: any) => {
                    setDataSheetName(response.nomplat);
                })
                .catch((e: Error) => {
                });
        };

        getDataSheetName(props.id).then(r => "ok");

    }, [props.id]);

    return (
       <h1>{dataSheetName}</h1>
    )};

export default NameDataSheet;
