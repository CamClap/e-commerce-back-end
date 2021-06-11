const connection = require('../database.js');

exports.getBestSellArticles = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT titre, quantiteCommande FROM lignecommande l, article a WHERE l.refArticle = a.ref ", (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};