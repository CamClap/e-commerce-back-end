exports.Commande = class {
    constructor(dateCommande, total, utilisateur) {
        this.dateCommande = dateCommande;
        this.total = total;
        this.utilisateur = utilisateur;
    }
}