const mp = require('mercadopago')

mp.configure({
    sandbox: 'true',
    access_token: process.env.ACCESSTOKEN_MP
});

async function pagar(preference){
        return await mp.preferences.create(preference);
}

module.exports = {pagar}