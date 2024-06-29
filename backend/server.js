const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createOrder } = require('./OrderCreation'); // Import createOrder function

const app = express();
const port = 5000; // Use a port that isn't in use by your frontend

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const extractOrderData = (message) => {
    // Regular expressions to match different fields
    const fieldMatchers = {
        Name: /Name:\s*([\w\s]+)\s*,/,
        Email: /Email:\s*([\w.-]+@[\w.-]+\.[\w.-]+)\s*,/,
        Phone: /Phone:\s*([\d-]+)\s*,/,
        Address: /Address:\s*([\w\s,-]+)\s*,/,
        Pincode: /Pincode:\s*([\d]+)\s*,/,
        Productid: /Productid:\s*([\d]+)\s*,/,
        Quantity: /Quantity:\s*([\d]+)\s*/
    };

    const orderData = {
        payment_method: 'cod',
        payment_method_title: 'Cash on Delivery',
        set_paid: false,
        status: 'pending',
        customer_id: 0,
        date_created: new Date().toISOString(),
        billing: {
            first_name: null,
            last_name: 'dumpdata',
            company: 'dumpdata',
            address_1: null,
            address_2: 'dumpdata',
            city: 'dumpdata',
            postcode: null,
            country: 'India',
            state: 'Kerala', // Assuming default state as Kerala
            email: null,
            phone: null
        },
        shipping: {
            first_name: null,
            last_name: 'dumpdata',
            company: 'dumpdata',
            address_1: null,
            address_2: 'dumpdata',
            city: 'dumpdata',
            postcode: null,
            country: 'India',
            state: 'Kerala', // Assuming default state as Kerala
            email: null,
            phone: null
        },
        line_items: []
    };

    // Function to assign matched data to orderData
    const assignData = (field, value) => {
        switch (field) {
            case 'Name':
                const names = value.trim().split(' ');
                orderData.billing.first_name = names[0] || null;
                orderData.billing.last_name = names.slice(1).join(' ') || null;
                orderData.shipping.first_name = names[0] || null;
                orderData.shipping.last_name = names.slice(1).join(' ') || null;
                break;
            case 'Email':
                orderData.billing.email = value.trim() || null;
                orderData.shipping.email = value.trim() || null;
                break;
            case 'Phone':
                orderData.billing.phone = value.trim() || null;
                orderData.shipping.phone = value.trim() || null;
                break;
            case 'Address':
                orderData.billing.address_1 = value.trim() || null;
                orderData.shipping.address_1 = value.trim() || null;
                break;
            case 'Pincode':
                orderData.billing.postcode = value.trim() || null;
                orderData.shipping.postcode = value.trim() || null;
                break;
            case 'Productid':
                orderData.product_id = value.trim() || null;
                break;
            case 'Quantity':
                orderData.quantity = value.trim() || null;
                break;
            default:
                break;
        }
    };

    // Extract and assign data based on field matchers
    Object.entries(fieldMatchers).forEach(([field, regex]) => {
        const match = message.match(regex);
        if (match) {
            assignData(field, match[1]);
        }
    });

    // Add product to line_items
    if (orderData.product_id && orderData.quantity) {
        orderData.line_items.push({
            product_id: parseInt(orderData.product_id, 10),
            quantity: parseInt(orderData.quantity, 10)
        });
    }

    // Copy billing data to shipping if shipping is not fully populated
    if (!orderData.shipping.first_name) {
        orderData.shipping.first_name = orderData.billing.first_name;
    }
    if (!orderData.shipping.last_name) {
        orderData.shipping.last_name = orderData.billing.last_name;
    }
    if (!orderData.shipping.address_1) {
        orderData.shipping.address_1 = orderData.billing.address_1;
    }
    if (!orderData.shipping.address_2) {
        orderData.shipping.address_2 = orderData.billing.address_2;
    }
    if (!orderData.shipping.city) {
        orderData.shipping.city = orderData.billing.city;
    }
    if (!orderData.shipping.postcode) {
        orderData.shipping.postcode = orderData.billing.postcode;
    }
    if (!orderData.shipping.state) {
        orderData.shipping.state = orderData.billing.state;
    }

    // Logging orderData to console for debugging
    console.log('Order Data:', orderData);

    // Return orderData or null if any required data is missing
    if (!orderData.billing.first_name || !orderData.billing.email || !orderData.billing.phone || !orderData.billing.address_1 || orderData.line_items.length === 0) {
        return null;
    }

    return orderData;
};

// Route to handle incoming messages and create orders
app.post('/api/message', async (req, res) => {
    const { message } = req.body;

    try {
        // Extract order data using regular expressions
        const orderData = extractOrderData(message);

        if (!orderData) {
            return res.status(400).json({ error: 'Invalid data. Please provide the data in the specified structure without missing anything!' });
        }

        // Create order using WooCommerce API
        const orderResponse = await createOrder(orderData);
        res.json({ message: `${orderData.billing.first_name}'s Order has been created successfully for the product ${orderData.product_id}`, orderResponse });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});


// Start server
app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
