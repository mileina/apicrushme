const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simuler une base de données en mémoidre
let invitations = [];

app.post('/api/invitation', (req, res) => {
    const { email, date, messageOui, messageNon } = req.body;
    const id = uuidv4();
    invitations.push({ id, email, date, messageOui, messageNon });
    res.status(201).json({ id: id });
});

// Pour récupérer les invitations (si nécessaire)
app.get('/api/invitations', (req, res) => {
    res.status(200).json(invitations);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
