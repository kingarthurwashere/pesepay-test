// app.js
const express = require('express');
const { Pesepay } = require('pesepay');

// Replace the following variables with your actual values
const integrationKey ='b32bae83-ea8a-4e4a-9b33-80851b1a5514';
const encryptionKey = '6b2a34e90711448a88253ca906727335';
const amount = 1; // Amount in your desired currency's minor unit (e.g., cents)
const currencyCode = 'ZWL'; // Replace with the desired currency code
const paymentReason = 'Test payment'; // Replace with your payment reason

const pesepay = new Pesepay(integrationKey, encryptionKey);

pesepay.resultUrl = 'http://localhost:3000/result';
pesepay.returnUrl = 'https://localhost:3000/return';

const app = express();

// Create a route for initiating the pesepay transaction
app.get('/initiate-transaction', async (req, res) => {
  try {
    // Create the transaction
    const transaction = pesepay.createTransaction(amount, currencyCode, paymentReason);

    // Initiate the transaction
    const initiationResponse = await pesepay.initiateTransaction(transaction);

    if (initiationResponse.success) {
      // Save the reference number and poll url
      const referenceNumber = initiationResponse.referenceNumber;
      const pollUrl = initiationResponse.pollUrl;

      // Get the redirect url and send it as the response to Postman
      const redirectUrl = initiationResponse.redirectUrl;
      res.send({ redirectUrl });
    } else {
      res.status(500).send({ error: initiationResponse.message });
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred' });
  }
});

// Create a route for polling the transaction status
app.get('/poll-transaction/:pollUrl', async (req, res) => {
  try {
    const pollUrl = req.params.pollUrl;

    // Poll the transaction status
    const pollResponse = await pesepay.pollTransaction(pollUrl);

    if (pollResponse.success) {
      res.send({ paid: pollResponse.paid });
    } else {
      res.status(500).send({ error: pollResponse.message });
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred' });
  }
});

// Start the server
const port = 3000; // Change this to the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
