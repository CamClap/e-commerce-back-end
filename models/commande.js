exports.Commande = class {
    constructor(dateCommande, total, idUtilisateur) {
        this.dateCommande = dateCommande;
        this.total = total;
        this.idUtilisateur = idUtilisateur;
    }
}