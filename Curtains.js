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
console.log(sign);

const body = JSON.stringify({
    "command": "turnOff",
    "parameter": "default",
    "commandType": "command"
});

const deviceId = "CE81EAD16115";
const optionsGet = {
    hostname: 'api.switch-bot.com',
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
};
const optionsPost = {
    hostname: 'api.switch-bot.com',
    port: 443,
    path: `/v1.1/devices/${deviceId}/commands`,
    method: 'POST',
    headers: {
        "Authorization": token,
        "sign": sign,
        "nonce": nonce,
        "t": t,
        'Content-Type': 'application/json',
        'Content-Length': body.length,
    },    
};


const req = https.request(optionsGet ,res => {
	let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

	res.on('end', () => {
        let curtainPosition = (JSON.parse(data).body.slidePosition)
        console.log(curtainPosition)
        if (curtainPosition > 90)  {
            JSON.stringify({
                "command": "turnOff",
                "parameter": "default",
                "commandType": "command"
            });
        } else {
            JSON.stringify({
                "command": "turnOn",
                "parameter": "default",
                "commandType": "command"
            });
        }
        })
    });


req.on('error', error => {
    console.error(error);
});

req.write(body);
req.end();

