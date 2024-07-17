// Import the Express.js library
const express = require('express');

// Create an instance of an Express application
const app = express();

// Set the port number from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// In-memory data store for items
let items = [];

// Create Operation: POST /items
// Endpoint to create a new item

//(request, reponse)
app.post('/items', (req, res) => {
    // Create a new item with a unique id and the properties from the request body
    const newItem = {
        id: items.length + 1,
        ...req.body
    };
    // Add the new item to the items array
    items.push(newItem);
    // Send a response with status 201 (Created) and the new item in JSON format
    res.status(201).json(newItem);
});

// Read Operation: GET /items
// Endpoint to get all items
app.get('/items', (req, res) => {
    // Send a response with the items array in JSON format
    res.json(items);
});

// Read Operation: GET /items/:id
// Endpoint to get a specific item by id
app.get('/items/:id', (req, res) => {
    // Find the item with the given id
    const item = items.find(i => i.id === parseInt(req.params.id));
    // If the item is not found, send a 404 (Not Found) response
    if (!item) return res.status(404).send('Item not found');
    // Send a response with the item in JSON format
    res.json(item);
});

// Update Operation: PUT /items/:id
// Endpoint to update a specific item by id
app.put('/items/:id', (req, res) => {
    // Find the item with the given id
    const item = items.find(i => i.id === parseInt(req.params.id));
    // If the item is not found, send a 404 (Not Found) response
    if (!item) return res.status(404).send('Item not found');
    
    // Update the item with the properties from the request body
    Object.assign(item, req.body);
    // Send a response with the updated item in JSON format
    res.json(item);
});

// Delete Operation: DELETE /items/:id
// Endpoint to delete a specific item by id
app.delete('/items/:id', (req, res) => {
    // Find the index of the item with the given id
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    // If the item is not found, send a 404 (Not Found) response
    if (itemIndex === -1) return res.status(404).send('Item not found');
    
    // Remove the item from the items array
    items.splice(itemIndex, 1);
    // Send a response with status 204 (No Content)
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    // Log a message indicating the server is running and on which port
    console.log(`Server running on http://localhost:${PORT}`);
});