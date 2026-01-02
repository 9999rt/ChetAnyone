const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
const resend = new Resend('re_eifjMcAv_LzS1LQoxUqZtch5qJVfCdgVX'); 

app.use(cors());
app.use(express.json());

app.post('/send-code', async (req, res) => {
    const { email, code } = req.body;
    try {
        await resend.emails.send({
            from: 'Gardaş Chat <onboarding@resend.dev>',
            to: email,
            subject: 'Giriş Kodun: ' + code,
            html: `<div style="background:#1e1f22; color:white; padding:40px; border-radius:20px; text-align:center; font-family:sans-serif;">
                    <h1 style="color:#5865f2;">SELAM GARDAŞ!</h1>
                    <p>Kodun: <b style="font-size:30px; letter-spacing:5px;">${code}</b></p>
                   </div>`
        });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Render için kritik ayar: PORT değişkenini ortamdan alır
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda aktif!`));