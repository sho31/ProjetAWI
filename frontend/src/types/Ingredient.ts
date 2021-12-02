export default interface Ingredient {
    idingredient: number,
    idcategorieingredient: number | null,
    idcategorieallergene: number | null,
    idunite: number | null,
    nomingredient: string,
    prixunitaireingredient: number,
    stock: number
}