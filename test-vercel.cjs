const https = require('https');

const data = JSON.stringify({ message: 'Oi' });
const options = {
    hostname: 'juntospelafibromialgia.vercel.app',
    path: '/api/chat/support',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(options, res => {
    let body = '';
    res.on('data', d => body += d);
    res.on('end', () => console.log('Response:', res.statusCode, body));
});

req.on('error', error => {
    console.error('Request Error:', error);
});

req.write(data);
req.end();
