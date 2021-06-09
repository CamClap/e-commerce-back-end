import { Article } from 'article';
class Livre extends Article {
    constructor(ref, titre, resume, prix, stock, ISBN, image, format) {
        super(ref, titre, resume, prix, stock);
        this.ISBN = ISBN;
        this.image = image;
        this.format = format;
    }
}

module.exports = { Livre };