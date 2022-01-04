export default class Cost {
    idCost: number;
    idfichetechnique: number;
    chargescalculated : boolean;
    chargescost: number | undefined;
    materialscost: number;
    coefwithcharges : number | undefined;
    coefwithoutcharges : number | undefined;
    includeddatasheetscost : number | undefined;


    constructor(idCost: number, idfichetechnique: number, chargescalculated: boolean, chargescost: number | undefined, materialscost: number, coefwithcharges: number | undefined, coefwithoutcharges: number | undefined, includeddatasheetscost : number | undefined) {
        this.idCost = idCost;
        this.idfichetechnique = idfichetechnique;
        this.chargescalculated = chargescalculated;
        this.chargescost = chargescost;
        this.materialscost = materialscost;
        this.coefwithcharges = coefwithcharges;
        this.coefwithoutcharges = coefwithoutcharges;
        this.includeddatasheetscost = includeddatasheetscost;
    }
}