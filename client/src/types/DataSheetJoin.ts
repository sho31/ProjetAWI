export default class DataSheetJoin {
    idfichetechniqueparent: number;
    idfichetechniquefille: number;
    numetape: number;

    constructor(idfichetechniqueparent: number, idfichetechniquefille: number, numetape: number) {
        this.idfichetechniqueparent = idfichetechniqueparent;
        this.idfichetechniquefille = idfichetechniquefille;
        this.numetape = numetape;
    }
}