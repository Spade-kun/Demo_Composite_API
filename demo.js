// Import required modules
const express = require('express');
const app = express();
const PORT = 3000;

// Mock database data for users and orders
const users = {
    1: { id: 1, name: 'John Doe', email: 'john@example.com' },
    2: { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
};

const orders = {
    1: [{ id: 101, item: 'Laptop', price: 1200 }, { id: 102, item: 'Mouse', price: 20 }],
    2: [{ id: 103, item: 'Phone', price: 800 }]
};

// API to get user details
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const user = users[userId];
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// API to get user orders
app.get('/api/user/:id/orders', (req, res) => {
    const userId = req.params.id;
    const userOrders = orders[userId];
    if (userOrders) {
        res.json(userOrders);
    } else {
        res.status(404).json({ error: 'No orders found for this user' });
    }
});

// Composite API to get both user details and their orders
app.get('/api/composite/user/:id/details-and-orders', async (req, res) => {
    const userId = req.params.id;

    try {
        // Simulating the calls to the individual APIs
        const user = users[userId];
        const userOrders = orders[userId];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!userOrders) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }

        // Combining the results
        const compositeResponse = {
            userDetails: user,
            userOrders: userOrders
        };

        res.json(compositeResponse);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
