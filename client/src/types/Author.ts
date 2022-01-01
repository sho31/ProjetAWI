export default class Author {
    idauteur?: any | null;
    nomauteur: string;
    prenomauteur: string;

    constructor(idauteur: any, nomauteur: string, prenomauteur: string) {
        this.idauteur = idauteur;
        this.nomauteur = nomauteur;
        this.prenomauteur = prenomauteur;
    }
}