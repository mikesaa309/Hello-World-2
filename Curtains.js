import fetch from 'node-fetch';

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

const options = {
    hostname: 'api.switch-bot.com',
    port: 443,
    path: path,
    method: method,
    headers: {
        "Authorization": token,
        "sign": sign,
        "nonce": nonce,
        "t": t,
        'Content-Type': 'application/json',
        'Content-Length': body.length,
    },
}

async function apiCall() {
    const response = await fetch(`api.switch-bot.com/v1.1/devices/${deviceId}/status`, {
        port: 443,
        method: 'GET',
        headers: {
            "Authorization": token,
            "sign": sign,
            "nonce": nonce,
            "t": t,
            "Content-Type": "application/json",
        }
    })

    const data = await response.json();
    console.log(data);
}

function areCurtainsOpen() {
    apiCall(getStatusPath, 'GET', bodyTurnOff, deviceId).then((res) => console.log(res));
}

function toggleCurtains() {
    console.log(areCurtainsOpen());
}

apiCall();