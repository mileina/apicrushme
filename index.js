
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'https://fonts.googleapis.com' 'https://fonts.gstatic.com'; style-src 'https://fonts.googleapis.com' 'unsafe-inline';");
    return next();
  });
  
// Configuration CORS
const corsOptions = {
  origin: ['http://localhost:3000', 'https://crushmoi-b78956e48bb4.herokuapp.com'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());


let invitations = [];

app.post('/api/invitation', (req, res) => {
    const { email, date, messageOui, messageNon } = req.body;
    const id = uuidv4();
    invitations.push({ id, email, date, messageOui, messageNon });
    res.status(201).json({ id: id });
});


app.get('/api/invitations', (req, res) => {
    res.status(200).json(invitations);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
