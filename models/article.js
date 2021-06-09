exports.Article = class {
    constructor(ref, titre, resume, prix, stock) {
        this.ref = ref;
        this.titre = titre;
        this.resume = resume;
        this.prix = prix;
        this.stock = stock;
    }
}