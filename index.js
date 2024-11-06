// index.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');  // For API calls

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Sample route to test the server
app.get('/', (req, res) => {
    res.send('Email Verification Service is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Email verification endpoint
app.post('/verify-email', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).send({ error: 'Email is required' });
    }

    try {
        // Replace with your email verification service's endpoint
        const response = await axios.get(`https://emailverificationapi.com/api/${email}`, {
            headers: { Authorization: `Bearer ${process.env.EMAIL_VERIFICATION_API_KEY}` }
        });

        if (response.data.status === "valid") {
            res.send({ valid: true, message: 'Email is valid!' });
        } else {
            res.send({ valid: false, message: 'Email is invalid or not authenticated.' });
        }

    } catch (error) {
        res.status(500).send({ error: 'Error verifying email' });
    }
});
app.use(express.static('public'));
