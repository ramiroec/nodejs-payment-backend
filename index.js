const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configura Stripe con tu clave de prueba
const stripe = new Stripe('sk_test_51NgfrlD0Flo7iVv57XuUcN2AaoW39eVlOozZVYrdR1VIZc3pL14dZOvXdLst0YpAyIPVRYKxcDER4zZ16Qc1ulAZ008RnFlhLJ'); 

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para crear un Payment Intent
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe usa centavos
      currency: 'usd',
    });

    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error al crear el Payment Intent' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});