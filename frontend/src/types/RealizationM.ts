export default class RealizationM {
    idetape: number;
    numetape: number;
    titreetape: string;
    descriptionetape: string;
    tempsetape: number;
    nomingredient: string;
    quantite: number;
    nomunite: string;


    constructor(idetape: number, numetape: number, titreetape: string, descriptionetape: string, tempsetape: number, nomingredient: string, quantite: number, nomunite: string) {
        this.idetape = idetape;
        this.numetape = numetape;
        this.titreetape = titreetape;
        this.descriptionetape = descriptionetape;
        this.tempsetape = tempsetape;
        this.nomingredient = nomingredient;
        this.quantite = quantite;
        this.nomunite = nomunite;
    }
}