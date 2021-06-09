// const { resolve } = require('path/posix');
const connection = require('../database.js');

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM article, livre where article.ref = refArticle", (err, result) => {
            console.log(req.sql)
            err ? reject(err) : resolve(result);
        });
    });
};
exports.getOneByRef = (ref) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("SELECT * FROM article, livre WHERE ref  = ? AND article.ref = refArticle ", ref, (err, result) => {
            console.log(req.sql)
            err || result.length == 0 ? reject(err) : resolve(result);
        });
    });
};

// exports.add = (a) => {
//     return new Promise((resolve, reject) => {
//         const req = connection.query("INSERT INTO article (titre, resume, prix, stock) " + 
//         "VALUES (titre = ?, resume = ?, prix = ?, stock = ?)", [a.titre, a.resume, a.prix, a.stock], (err, result) => {
//             console.log(req.sql)
//             err ? reject(err) : resolve(result);
//         });
//     });
// };
// RAJOUTER LE GENRE
// exports.addLivreArticle = (a) => {
//     return new Promise((resolve, reject) => {
//         const req = connection.query("INSERT INTO livre (ISBN, image, format, refArticle) " + 
//         "VALUES (ISBN = ?, imageLivre = ?, formatLivre = ?, refArticle = ?)", 
//         [a.ISBN, a.image, a.stock, a.refArticle], (err, result) => {
//             console.log(req.sql)
//             err ? reject(err) : resolve(result);
//         });
//     });
// };
exports.edit = (ref, a) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("UPDATE article SET ? WHERE ref = ?", [a, ref], (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};
exports.delete = (ref) => {
    return new Promise((resolve, reject) => {
        const req = connection.query("DELETE FROM article WHERE ref = ?", ref, (err, result) => {
            console.log(req.sql)
            err || result.affectedRows == 0 ? reject(err) : resolve(result);
        });
    });
};