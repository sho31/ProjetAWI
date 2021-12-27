export default class Ingredient {
    nomingredient: string;
    idingredient: number;
    sumquantite: number;
    prixunitaireingredient: number;

    constructor(nomingredient: string, idingredient: number, sumquantite: number, prixunitaireingredient: number) {
        this.nomingredient = nomingredient;
        this.idingredient = idingredient;
        this.sumquantite = sumquantite;
        this.prixunitaireingredient = prixunitaireingredient;
    }
}