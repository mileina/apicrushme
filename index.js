require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Configuration de CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://crushmoi-b78956e48bb4.herokuapp.com'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');
});

// Route pour créer une nouvelle invitation
app.post('/api/invitation', (req, res) => {
  const { id, email, date, messageOui, messageNon } = req.body;
  console.log('Données reçues:', req.body);
  
  const query = 'INSERT INTO invitations (id, email, date, messageOui, messageNon) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [id, email, date, messageOui, messageNon], (err, result) => {
    if (err) {
      console.error('Erreur de base de données:', err);
      res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données' });
    } else {
      console.log('Invitation enregistrée avec succès');
      res.json({ message: 'Invitation enregistrée', id });
    }
  });
});

// Route pour récupérer une invitation spécifique
app.get('/api/invitation/:id', (req, res) => {
  const invitationId = req.params.id;
  const query = 'SELECT * FROM invitations WHERE id = ?';
  db.query(query, [invitationId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: 'Invitation non trouvée' });
      }
    }
  });
});

// Route d'accueil pour vérifier que le serveur fonctionne
app.get('/', (req, res) => {
  res.send('Le serveur fonctionne correctement.');
});

// Démarrage du serveur
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
