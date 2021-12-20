export default class Ingredient {
    idingredient: number;
    idcategorieingredient: number | null;
    idcategorieallergene: number | null;
    idunite: number | null;
    nomingredient: string;
    prixunitaireingredient: number;
    stock: number;

    constructor(idingredient: number, idcategorieingredient: number | null, idcategorieallergene: number | null, idunite: number | null, nomingredient: string, prixunitaireingredient: number, stock: number) {
        this.idingredient = idingredient;
        this.idcategorieingredient = idcategorieingredient;
        this.idcategorieallergene = idcategorieallergene;
        this.idunite = idunite;
        this.nomingredient = nomingredient;
        this.prixunitaireingredient = prixunitaireingredient;
        this.stock = stock;
    }

}