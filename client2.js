const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sendMessage(message) {
    const client = new net.Socket();

    client.connect(12345, 'localhost', () => {
        client.write(message); 
    });

    client.on('data', (data) => {
        console.log('Received: ', data.toString().trim());
        client.end(); 
        promptUser(); 
    });

    client.on('close', () => {
        // console.log('Connection closed');
    });
}

function promptUser() {
    rl.question("Send: " , (input) => {
        if (input.toLowerCase() === 'exit') {
            console.log("Exiting...");
            rl.close();
        } else {
            sendMessage(input); 
        }
    });
}

promptUser();
