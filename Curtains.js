const crypto = require('crypto');
const https = require('https');
const token = "57ad344e146aa706c42e1e55a6bb2be8f37a1c697f9ed9349ac0df8ec85ee96cc253400aa3789da4e5329dcfd8a708d3";
const secret = "5f87ec0ddc65e392f2cbffbfb9be2032";
const t = Date.now();
const nonce = "requestID";
const data = token + t + nonce;
const signTerm = crypto.createHmac('sha256', secret)
    .update(Buffer.from(data, 'utf-8'))
    .digest();
const sign = signTerm.toString("base64");
const deviceId = "CE81EAD16115";

const getStatusPath = `/v1.1/devices/${deviceId}/status`;
const postCommandPath = `/v1.1/devices/${deviceId}/commands`;

const bodyTurnOff = JSON.stringify({
    "command": "turnOff",
    "parameter": "default",
    "commandType": "command"
});

const bodyTurnOn = JSON.stringify({
    "command": "turnOn",
    "parameter": "default",
    "commandType": "command"
});

// console.log(sign);

function apiCall(path, method, body, deviceId) {
    return new Promise((resolve, reject) => {

        if (body === undefined) {
            body = '';
        }

        const options = {
            Hostname: 'api.switch-bot.com',
            port: 443,
            path: `/v1.1/devices/${deviceId}/status`,
            method: 'GET',
            headers: {
                "Authorization": token,
                "sign": sign,
                "nonce": nonce,
                "t": t,
                'Content-Type': 'application/json',
                'Content-Length': body.length,
            },
        }

        const req = https.request(options, res => {
            let apiData = '';

            res.on('data', (chunk) => {
                apiData += chunk;
            });
    
            res.on('end', () => {
                // let curtainPosition = (JSON.parse(apiData).body.slidePosition)
                resolve(apiData);
            })
        });
    
        req.on('error', error => {
            reject(error);
        });
        req.end();
    })
   
}

async function areCurtainsOpen() {
    return await apiCall(getStatusPath, 'GET')
}

function toggleCurtains() {
    console.log(areCurtainsOpen());
}

toggleCurtains();