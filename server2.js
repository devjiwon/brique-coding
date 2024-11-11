const net = require('net');

const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log('Received from client:', message);

        const response = (message === 'Ping') ? 'Pong' : message;
        socket.write(response);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(12345, () => {
    console.log('Server listening on port 12345');
});
