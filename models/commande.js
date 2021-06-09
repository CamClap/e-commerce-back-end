exports.Commande = class {
    constructor(num, dateCommande, total, utilisateur) {
        this.num = num;
        this.dateCommande = dateCommande;
        this.total = total;
        this.utilisateur = utilisateur;
    }
}