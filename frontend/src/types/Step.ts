export default class Step {
    idetape: number;
    idfichetechnique: number;
    titreetape: string;
    descriptionetape: string;
    tempsetape: number;
    numetape: number;


    constructor(idetape: number, idfichetechnique: number, titreetape: string, descriptionetape: string, tempsetape: number, numetape: number) {
        this.idetape = idetape;
        this.idfichetechnique = idfichetechnique;
        this.titreetape = titreetape;
        this.descriptionetape = descriptionetape;
        this.tempsetape = tempsetape;
        this.numetape = numetape;
    }
}