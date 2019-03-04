import sc2 from 'steemconnect';

let SteemConnect = sc2.Initialize({
    app: 'eaudebla',
    callbackURL: 'http://localhost:3000',
    accessToken: 'access_token',
    scope: ['vote', 'comment'],
});

export default SteemConnect