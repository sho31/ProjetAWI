import React, { useRef } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';

import PrintableComponent  from './HeaderDataSheet';
import {Button} from "antd";
import HeaderDataSheet from "./HeaderDataSheet";

const PrintPage = () => {
    const componentRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div ref={componentRef}>
                <PrintableComponent  id={1}/>
            </div>
            <ReactToPrint
                trigger={() => <Button color="primary">Imprimer la fiche technique</Button>}
                content={() => componentRef.current}
            />
        </div>
    );
};

export default PrintPage;