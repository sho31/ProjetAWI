CREATE DATABASE projetAWI;

CREATE TABLE Auteur (
    idAuteur SERIAL PRIMARY KEY,
    nomAuteur varchar(50) NOT NULL,
    prenomAuteur varchar(50) NOT NULL
    );
CREATE TABLE CategorieIngredient (
    idCategorieIngredient serial PRIMARY KEY,
    nomCategorieIngredient varchar(50) NOT NULL
);
CREATE TABLE Unite (
    idUnite serial PRIMARY KEY,
    nomUnite varchar(50) NOT NULL
);
CREATE TABLE CategorieAllergene (
    idCategorieAllergene serial PRIMARY KEY,
    categorieAllergene varchar(50) NOT NULL
);
CREATE TABLE Ingredient(
    idIngredient serial PRIMARY KEY,
    idCategorieIngredient int REFERENCES  CategorieIngredient,
    idCategorieAllergene int REFERENCES CategorieAllergene,
    idUnite int REFERENCES Unite,
    nomIngredient varchar(50) NOT NULL,
    prixUnitaireIngredient numeric NOT NULL,
    stock int

);
CREATE TABLE Etape (
    idEtape serial PRIMARY KEY,
    idFicheTechnique int REFERENCES FicheTechnique,
    titreEtape varchar(50) NOT NULL,
    descriptionEtape varchar(50) NOT NULL,
    tempsEtape numeric NOT NULL

);

CREATE TABLE CategorieFicheTechnique (
    idCategorieFicheTechnique serial PRIMARY KEY,
    NomCategorieFicheTechnique varchar(50) NOT NULL
);

CREATE TABLE FicheTechnique (
    idFicheTechnique serial PRIMARY KEY,
    idCategorieFicheTechnique int REFERENCES  CategorieFicheTechnique,
    idAuteur int REFERENCES Auteur,
    nomPlat varchar(50) NOT NULL,
    nombreCouverts int,
    image bytea
);

CREATE TABLE FicheTechniqueJointure (
    idFicheTechniqueParent int REFERENCES FicheTechnique,
    idFicheTechniqueFille int REFERENCES FicheTechnique,
    numEtape int,
    PRIMARY KEY (idFicheTechniqueFille, idFicheTechniqueParent)
);