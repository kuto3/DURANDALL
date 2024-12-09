import { PrismaClient } from '@prisma/client';
import { buffer } from 'micro';
import Stripe from 'stripe';

// Initialize Prisma Client and Stripe
const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2022-11-15',
});

// Disable body parsing to allow Stripe to validate the payload signature
export const config = {
  api: {
    bodyParser: false, // Ensures the raw body is passed
  },
};

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    // Fetch the raw body from the request
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      // Verify the event signature using the raw body
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_KEY);
    } catch (err) {
      // Log the error and respond with 400
      console.error('Error verifying Stripe signature:', err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event based on the event type
    switch (event.type) {
      case 'invoice.payment_succeeded':
        const invoice = event.data.object;
        const customerEmail = invoice.customer_email || invoice.email;
        
        // Update user access in your Prisma database
        try {
          await prisma.user.update({
            where: { email: customerEmail },
            data: { hasAccess: true },
          });
          console.log(`User with email ${customerEmail} was granted access.`);
        } catch (err) {
          console.error('Error updating user access in Prisma:', err);
        }
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Handle subscription deletion
        try {
          const customer = await stripe.customers.retrieve(customerId);
          const customerEmail = customer.email;
          if (customerEmail) {
            await prisma.user.update({
              where: { email: customerEmail },
              data: { hasAccess: false },
            });
            console.log(`User with email ${customerEmail} had their access revoked.`);
          } else {
            console.error('Customer email not found.');
          }
        } catch (err) {
          console.error('Error retrieving customer from Stripe:', err);
        }
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object;
        const failedEmail = failedInvoice.customer_email || failedInvoice.email;
        console.log(`Payment failed for user with email ${failedEmail}.`);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
