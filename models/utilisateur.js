exports.Utilisateur = class {
    constructor(nom, prenom, email, mdp, adresse, adresseLivraison) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.mdp = mdp;
        this.adresse = adresse;
        this.adresseLivraison = adresseLivraison;
    }
}