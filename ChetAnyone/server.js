const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
const resend = new Resend('re_2R4iJ3pb_Q85rBgoYHhbbKxh9mKG8DS62'); 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Sunucu Aktif!'));

app.post('/send-code', async (req, res) => {
    const { email, code } = req.body;
    try {
        await resend.emails.send({
            from: 'Gardaş Chat <onboarding@resend.dev>',
            to: email,
            subject: 'Giriş Kodun: ' + code,
            html: `<h1>Giriş Kodun: ${code}</h1>`
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda!`));