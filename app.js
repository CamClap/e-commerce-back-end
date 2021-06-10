const express = require('express');
const app = express();

const article = require('./routes/article.route');
// const livre = require('./routes/livre.route');
const commande = require('./routes/commande.route');
const auteur = require('./routes/auteur.route');
const genre = require('./routes/genre.route');
const editeur = require('./routes/editeur.route');
const connexion = require('./routes/connexion.route');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.use(express.json());

app.use('/article', article);
// app.use('/livre', livre);
app.use('/commande', commande);
app.use('/auteur', auteur);
app.use('/genre', genre);
app.use('/editeur', editeur);
app.use('/connexion', connexion);
app.all('/*', (req, res) => {
    res
        .status(404)
        .send('Not Found');
});
app.listen(3000, () => console.log('Adresse du serveur : http://localhost:3000')
);