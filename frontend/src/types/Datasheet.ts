export default class Datasheet {
    idfichetechnique: number;
    idcategoriefichetechnique: number | null;
    idauteur: number | null;
    nomauteur: string;
    nomplat: string;
    nombrecouverts: number;
    image: string;

    constructor(idfichetechnique: number, idcategoriefichetechnique: number, idauteur: number,nomauteur: string, nomplat: string, nombrecouverts: number, image: string) {
        this.idfichetechnique = idfichetechnique;
        this.idcategoriefichetechnique = idcategoriefichetechnique;
        this.idauteur = idauteur;
        this.nomauteur = nomauteur;
        this.nomplat = nomplat;
        this.nombrecouverts = nombrecouverts;
        this.image = image;
    }

}