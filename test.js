const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.calls.list({status: 'busy', to: '+15558675310', limit: 20})
            .then(calls => calls.forEach((c) => {
                client.conferences('CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                    .participants('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                    .fetch()
                    .then(participant => console.log(participant.callSid));
            }));

client.conferences('CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .participants('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .fetch()
            .then(participant => console.log(participant.callSid));