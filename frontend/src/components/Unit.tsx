import React, { useState, useEffect} from "react";
import UnitDataService from "../services/UnitService";
import ITutorialData from '../types/Unit';


const UnitsList: React.FC = () => {
    const [units, setUnits] = useState<Array<ITutorialData>>([]);

    const retrieveTutorials = async () => {

       await UnitDataService.getAllUnits()
            .then((response: any) => {
                setUnits(response);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        retrieveTutorials();
    }, []);

    return (
        <div>
            <div>
                <h4>Liste des unités </h4>
                <ul>
                    {units &&
                    units.map((unit) => (
                        <li>{unit.nomunite}</li>))};
                </ul>
            </div>
        </div>
    );
};

export default UnitsList;
