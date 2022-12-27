import time
import hashlib
import hmac
import base64

# open token
token = '57ad344e146aa706c42e1e55a6bb2be8f37a1c697f9ed9349ac0df8ec85ee96cc253400aa3789da4e5329dcfd8a708d3' # copy and paste from the SwitchBot app V6.14 or later
# secret key
secret = '5f87ec0ddc65e392f2cbffbfb9be2032' # copy and paste from the SwitchBot app V6.14 or later
nonce = ''
t = int(round(time.time() * 1000))
string_to_sign = '{}{}{}'.format(token, t, nonce)

string_to_sign = bytes(string_to_sign, 'utf-8')
secret = bytes(secret, 'utf-8')

sign = base64.b64encode(hmac.new(secret, msg=string_to_sign, digestmod=hashlib.sha256).digest())
print ('Authorization: {}'.format(token))
print ('t: {}'.format(t))
print ('sign: {}'.format(str(sign, 'utf-8')))
print ('nonce: {}'.format(nonce))