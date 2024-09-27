const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



router.post('/create-payment-intent', async (req, res) => {
    const { product } = req.body;

    const { price, currency } = product;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price * 100,
            currency: currency,
            automatic_payment_methods: { enabled: true },
        });

        res.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
