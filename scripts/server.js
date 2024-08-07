const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Configure multer
const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = 3001; // Adjust this if needed

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..'))); // Serve static files from project-root

app.get('/clear-cache', (req, res) => {
    // Clear require cache
    Object.keys(require.cache).forEach(function(key) {
        delete require.cache[key];
    });

    // Clear node-cache (myCache should be defined somewhere if used)
    // myCache.flushAll(); // Commented out as myCache is not defined
    
    res.send('Cache cleared');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Serve foods.json
app.get('/json/burger.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'json', 'burger.json'));
});

// Serve fry.json
app.get('/json/fry.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'json', 'fry.json'));
});

// Serve sub.json
app.get('/json/sub.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'json', 'sub.json'));
});

// Serve foodIds.json
app.get('/json/foodIds.json', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'json', 'foodIds.json'));
});

// Update burger.json
app.post('/update-json', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFile(path.join(__dirname, '..', 'json', 'burger.json'), data, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('File updated successfully');
        }
    });
});

// Update foodIds.json
app.post('/update-foodIds', (req, res) => {
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFile(path.join(__dirname, '..', 'json', 'foodIds.json'), data, (err) => {
        if (err) {
            console.error('Error writing JSON file:', err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('File updated successfully');
        }
    });
});

// Handle image upload
app.post('/upload-image', upload.single('imageFile'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded');
    }

    const filePath = path.join(__dirname, '..', 'foodImages', 'burgers', file.originalname);
    fs.rename(file.path, filePath, (err) => {
        if (err) {
            console.error('Error moving file:', err);
            return res.status(500).send('Error uploading file');
        }

        res.json({ fileName: file.originalname });
    });
});

// Add new order
app.post('/addOrder', (req, res) => {
    const newOrder = req.body;
    const orderFilePath = path.join(__dirname, '..', 'json', 'order.json');

    fs.readFile(orderFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading order.json:', err);
            return res.status(500).send('Server error');
        }

        let orders;
        try {
            orders = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            return res.status(500).send('Server error');
        }

        orders.push(newOrder);

        fs.writeFile(orderFilePath, JSON.stringify(orders, null, 2), (err) => {
            if (err) {
                console.error('Error writing order.json:', err);
                return res.status(500).send('Server error');
            }
            res.status(200).send('Order added successfully');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
