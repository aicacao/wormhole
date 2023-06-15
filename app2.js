const express = require('express');
const fs = require('fs');

const app = express();
const counterFile = 'counter.txt';

if (!fs.existsSync(counterFile)) {
    fs.writeFileSync(counterFile, '0');
}

function readCounter() {
    return parseInt(fs.readFileSync(counterFile, 'utf8'));
}

function writeCounter(counter) {
    fs.writeFileSync(counterFile, counter.toString());
}

app.get('/', (req, res) => {
    let counter = readCounter();
    counter++;
    writeCounter(counter);

    process.nextTick(() => {
        console.log(`Response: ${counter}`);
    });

    res.send(counter.toString());
});

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});
