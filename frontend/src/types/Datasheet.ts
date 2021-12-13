export default class Datasheet {
    idfichetechnique: number | null;
    idcategoriefichetechnique: number | null;
    idauteur: number | null;
    nomplat: string;
    nombrecouverts: number;
    image: string;


    constructor(idfichetechnique: number, idcategoriefichetechnique: number, idauteur: number, nomplat: string, nombrecouverts: number, image: string) {
        this.idfichetechnique = idfichetechnique;
        this.idcategoriefichetechnique = idcategoriefichetechnique;
        this.idauteur = idauteur;
        this.nomplat = nomplat;
        this.nombrecouverts = nombrecouverts;
        this.image = image;
    }

}