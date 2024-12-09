// Backend API pour générer un nonce
app.get('/api/generate-nonce', (req, res) => {
    const nonce = crypto.randomBytes(16).toString('hex');
    // Sauvegarder le nonce dans la session utilisateur ou une base de données temporaire
    req.session.nonce = nonce;
    res.json({ nonce });
});

// Backend API pour valider le mint
app.post('/api/validate-mint', (req, res) => {
    const { nonce, secret } = req.body;
    if (nonce !== req.session.nonce) {
        return res.status(400).json({ error: 'Invalid nonce' });
    }
    // Optionnel: ajouter des validations supplémentaires
    res.json({ valid: true });
});
