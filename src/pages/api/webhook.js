// pages/api/webhook.js
const { NextApiRequest, NextApiResponse } = require('next');

// Stocke les connexions WebSocket
let connections = [];

// Fonction WebSocket pour envoyer les événements
function sendEventToClients(event) {
  connections.forEach((ws) => {
    ws.send(JSON.stringify(event));
  });
}

module.exports = function handler(req = NextApiRequest, res = NextApiResponse) {
  if (req.method === 'POST') {
    const event = req.body;

    // Traiter l'événement Stripe
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log(`Payment succeeded: ${event.data.object.id}`);
        break;
      case 'payment_method.attached':
        console.log(`Payment method attached: ${event.data.object.id}`);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Envoyer l'événement Stripe à tous les clients WebSocket connectés
    sendEventToClients(event);

    // Répondre à Stripe pour confirmer la réception
    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
