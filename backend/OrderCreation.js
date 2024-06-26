// backend/OrderCreation.js

const axios = require('axios');
const https = require('https');
require('dotenv').config();

const url2 =process.env.URL2;
const consumerKey = process.env.CONSUMER_KEY;
const consumerSecret = process.env.CONSUMER_SECRET;

const createOrder = async (orderData) => {
  try {
    // Validate order data (optional based on frontend validation)
    if (!isValidOrderData(orderData)) {
      throw new Error('Invalid order data. Required fields are missing.');
    }

    // Make POST request to create order
    const response = await axios.post(url2, orderData, {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: consumerKey,
        password: consumerSecret
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }) // Only if needed for self-signed certificates
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to validate order data (replace with actual validation logic)
const isValidOrderData = (orderData) => {
  return (
    orderData &&
    orderData.billing &&
    orderData.billing.first_name &&
    orderData.billing.address_1 &&
    orderData.billing.city &&
    orderData.billing.email &&
    orderData.billing.phone &&
    orderData.shipping &&
    orderData.shipping.first_name &&
    orderData.shipping.address_1 &&
    orderData.shipping.city
    // Add more validation as needed
  );
};

module.exports = {
  createOrder
};