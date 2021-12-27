export default class StepIngredientJoin {
    idetape?: number | null;
    idingredient: number;
    quantite: number;
    idfichetechnique : number;

    constructor(idetape : number,idingredient: number, quantite: number, idfichetechnique : number) {
        this.idetape = idetape;
        this.idingredient = idingredient;
        this.quantite = quantite;
        this.idfichetechnique = idfichetechnique
    }
}