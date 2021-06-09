exports.Article = class {
    constructor(ref, titre, resume, prix, stock, ISBN, image, format, nomEditeur, nomGenre) {
        this.ref = ref;
        this.titre = titre;
        this.resume = resume;
        this.prix = prix;
        this.stock = stock;
        this.ISBN = ISBN;
        this.image = image;
        this.format = format;
        this.nomEditeur = nomEditeur;
        this.nomGenre = nomGenre;
    }
}