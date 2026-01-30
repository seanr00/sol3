const express = require('express');
const path = require('path');
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;

// Serve static files from current directory
app.use(express.static(path.join(__dirname)));

// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🚀 Wallet DApp Server Running        ║
╚════════════════════════════════════════╝

✅ Server started successfully!

🌐 Local:            http://localhost:${PORT}
🌐 Network:          http://your-ip:${PORT}

📁 Serving files from: ${__dirname}

Press Ctrl+C to stop the server
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
});